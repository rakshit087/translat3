import { Flex, SkeletonText, Text } from "@chakra-ui/react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { ToTranslationButton } from "./ToTranslation";

export const UserPooled = ({ data, isLoading }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Text fontSize={"2xl"} my={8}>
        Your Pooled Projects
      </Text>
      {isLoading && (
        <Flex
          width={"16rem"}
          bgColor={bgColor}
          mr={12}
          height={{ base: 52, md: 64 }}
          justifyContent={"space-between"}
          flexDirection={"column"}
          p={"4"}
          rounded="xl"
          flex={"0 0 auto"}
        >
          <SkeletonText noOfLines={1} />
          <SkeletonText noOfLines={4} />
          <Button colorScheme="purple" size="sm" rounded="2xl" isDisabled>
            <SkeletonText noOfLines={1} />
          </Button>
        </Flex>
      )}
      {data.length == 0 && (
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={"lg"} my={8}>
            You dont have any projects in your pool.
          </Text>
        </Flex>
      )}
      {data && !isLoading && (
        <Flex overflowX={"auto"} flexWrap={"nowrap"} scrollBehavior={"smooth"} paddingBottom={4}>
          {data.map((project) => (
            <Flex
              key={parseInt(project.id)}
              width={"16rem"}
              bgColor={bgColor}
              mr={12}
              height={{ base: 52, md: 64 }}
              justifyContent={"space-between"}
              flexDirection={"column"}
              p={"4"}
              rounded="xl"
              flex={"0 0 auto"}
            >
              <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"lg"} textAlign="center">
                  {project.title}
                </Text>
                <Button disabled colorScheme="purple" variant="solid" h={"1rem"} rounded="2xl" marginLeft={2}>
                  <Text fontSize={"xs"}> {(parseFloat(project.vault) / 1e18).toString().slice(0, 4)} MATIC </Text>
                </Button>
              </Flex>
              <Text fontSize={"sm"} textAlign="center">
                {project.description.slice(0, 100)}
              </Text>
              <ToTranslationButton projectId={parseInt(project.id)} />
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};
