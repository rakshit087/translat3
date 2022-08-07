import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { Box, Flex, IconButton, Text, Tooltip, useToast } from "@chakra-ui/react";
import { MdThumbUp } from "react-icons/md";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useWaitForTransaction, useContractWrite, usePrepareContractWrite } from "wagmi";

export const VoteButton = ({ translation }) => {
  const { address } = useAccount();
  const [votes, setVotes] = useState<number>(parseInt(translation.votes));
  const toast = useToast();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "vote",
    args: [parseInt(translation.id).toString()],
  });
  const { data, write } = useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Voted Succesgfully 🎉",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setVotes(votes + 1);
    }
  }, [isSuccess]);

  return (
    <Flex flexDirection={"column"} alignItems="center">
      <Tooltip isDisabled={address != translation.author} label="You cannot vote your own translations">
        <Box>
          <IconButton
            aria-label="vote"
            icon={<MdThumbUp />}
            colorScheme="purple"
            isDisabled={translation.voters.includes(address) || address == translation.author}
            mb={2}
            onClick={() => {
              write?.();
            }}
          />
        </Box>
      </Tooltip>
      <Text>{votes}</Text>
    </Flex>
  );
};
