import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { Button, useToast } from "@chakra-ui/react";
import { useWaitForTransaction, useContractWrite, usePrepareContractWrite, useContract, useSigner } from "wagmi";

export const ToTranslationButton = ({ projectId }) => {
  const toast = useToast();
  const args = [projectId.toString()];
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "toTranslationPhase",
    args: args,
  });
  const { data, write } = useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });
  return (
    <Button
      w={"100%"}
      colorScheme="purple"
      variant="solid"
      size={"sm"}
      rounded="2xl"
      margin={0}
      onClick={() => {
        write?.();
      }}
    >
      To Translation
    </Button>
  );
};
