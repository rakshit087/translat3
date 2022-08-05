import { Avatar, Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const User = () => {
  return <ConnectButton accountStatus={"address"} />;
};
