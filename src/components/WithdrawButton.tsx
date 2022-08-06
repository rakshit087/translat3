import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { Button } from "@chakra-ui/react";
import { useContract, useSigner } from "wagmi";

export const WithdrawButton = ({ amount }) => {
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    signerOrProvider: signer,
  });

  return (
    <Button
      w={"100%"}
      colorScheme="purple"
      variant="solid"
      size={"sm"}
      rounded="2xl"
      margin={0}
      onClick={() => {
        contract.withdrawVault();
      }}
      isDisabled={amount == 0}
    >
      Claim Tokens
    </Button>
  );
};
