"use client";

import { FC } from "react";
import { Box, Flex, Text, Avatar, Icon } from "@chakra-ui/react";
import { FolderDashed, DotsThreeVertical } from "@phosphor-icons/react";

interface IProps {
  id: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const TaskCard: FC<IProps> = ({ title, description, id, onClick }) => {
  return (
    <Box
      bg={"brand.backgroundSix"}
      borderRadius={"md"}
      color={"brand.text.200"}
      fontWeight={"semibold"}
      fontSize={"sm"}
      w={"100%"}
      mb={4}
      cursor={"pointer"}
      px={4}
      py={2}
      onClick={onClick}
    >
      <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"100%"}
      >
        <Box w={"80%"}>
          <Text>{title.length > 15 ? title.slice(0, 15) + "..." : title}</Text>
          <Text fontSize={"xs"} fontWeight={"bold"} color={"brand.text.450"}>
            {description.length > 55
              ? description.slice(0, 55) + "..."
              : description}
          </Text>
        </Box>
        <Avatar
          name={"teste"}
          src="https://itp.live/public/styles/full_img/public/images/2021/10/31/nftmonkey_3.png?Hv9WK--v"
          size="xs"
          cursor="pointer"
          ml={4}
        />
      </Flex>
      <Flex
        mt={2}
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
      >
        <Icon as={FolderDashed} fontSize={"large"} />
        <Icon as={DotsThreeVertical} fontSize={"large"} />
      </Flex>
    </Box>
  );
};

export default TaskCard;
