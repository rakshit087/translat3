import { Button } from "@chakra-ui/react";
import { distribute } from "../services/distributeService";

export const Distribute = () => {
  return (
    <Button
      w={"100%"}
      colorScheme="purple"
      variant="solid"
      size={"sm"}
      rounded="2xl"
      margin={0}
      onClick={() => {
        distribute();
      }}
    >
      Distribute
    </Button>
  );
};
