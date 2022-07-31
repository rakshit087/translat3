import { Avatar, Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
export const User = () => {
  const { authenticate, isAuthenticated, user, isAuthenticating, logout, Moralis } = useMoralis();

  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} cursor={"pointer"} padding={0}>
        <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
      </MenuButton>
      <MenuList paddingX={2} paddingY={4} textAlign="center">
        {!isAuthenticated && (
          <Box>
            <Text marginBottom={5}>Connect Your Wallet here</Text>
            <Button
              colorScheme={"purple"}
              onClick={async () => {
                await authenticate({ signingMessage: "Login to Translat3" });
                Moralis.enableWeb3();
                Moralis.onAccountChanged(() => {
                  console.log("Account Cahnged");
                  logout();
                });
              }}
            >
              Connect
            </Button>
          </Box>
        )}
        {isAuthenticated && (
          <Box>
            <Text marginBottom={5}>
              {user!.get("ethAddress").slice(0, 5) + "..." + user!.get("ethAddress").slice(-5)}
            </Text>
            <Button
              colorScheme={"red"}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};
