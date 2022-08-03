import { Avatar, Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const User = () => {
  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} cursor={"pointer"} padding={0}>
        <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
      </MenuButton>
      <MenuList paddingX={2} paddingY={4} textAlign="center">
        <ConnectButton accountStatus={"address"} />
      </MenuList>
    </Menu>
  );
};
