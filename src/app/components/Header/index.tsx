"use client";
import { FC, useContext } from "react";
import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import { AuthContext } from "@/app/context/AuthContext";
import { SignOut } from "@phosphor-icons/react";

const Header: FC = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Box
      as="header"
      shadow="md"
      py={4}
      px="6"
      bg={"brand.backgroundSecondary"}
      color={"brand.text.200"}
      borderBottom={"1px solid"}
      borderColor={"brand.primary.500"}
    >
      <Box maxW="1400px" mx="auto">
        <Flex
          alignItems="center"
          justify="space-between"
          fontSize="2xl"
          fontWeight="semibold"
          gap={4}
        >
          inFinity
          <Flex
            alignItems="center"
            justify="space-between"
            fontSize="2xl"
            fontWeight="semibold"
            gap={4}
          >
            <Text fontSize="sm" fontWeight="semibold">
              {user?.name}
            </Text>
            <Avatar
              display={{ base: "none", md: "block" }}
              name={user?.name}
              src="https://itp.live/public/styles/full_img/public/images/2021/10/31/nftmonkey_3.png?Hv9WK--v"
              size="md"
              cursor="pointer"
              onClick={() => signOut()}
            >
              <AvatarBadge
                borderRadius="full"
                bg="brand.primary.600"
                color="black"
                px="0.2rem"
                py="1"
                fontWeight="semibold"
                right="-5px"
              >
                <SignOut />
              </AvatarBadge>
            </Avatar>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
