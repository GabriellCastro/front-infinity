"use client";

import { FC, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { Icon, Text, Box, Flex, useDisclosure } from "@chakra-ui/react";
import TaskCard from "../TaskCard";
import { ModalCreateTaskAndUpdate } from "../ModalCreateTaskAndUpdate";

interface IProps {
  label: string;
  lenght: number;
  action: () => void;
  labelColor: string;
  arrayTask?: Array<any>;
}

const ButtonLabel: FC<IProps> = ({
  label,
  lenght,
  action,
  labelColor,
  arrayTask = [],
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskId, setTaskId] = useState("");
  return (
    <Box>
      <ModalCreateTaskAndUpdate
        isOpen={isOpen}
        onClose={onClose}
        taskId={taskId}
      />
      <Box
        as="button"
        onClick={() => action()}
        bg={"brand.backgroundSix"}
        borderRadius={"md"}
        color={"brand.text.200"}
        fontWeight={"semibold"}
        fontSize={"sm"}
        w={"300px"}
        h={"60px"}
      >
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Box w={"4px"} h={"40px"} rounded={"md"} bg={labelColor} />
          <Text>{label}</Text>
          <Text
            rounded={"full"}
            bg={labelColor}
            px={2}
            py={1}
            fontSize={"xx-small"}
            fontWeight={"bold"}
            color={"black"}
          >
            {lenght}
          </Text>
          <Icon
            as={Plus}
            mr={4}
            fontSize={"large"}
            fontWeight={"bold"}
            color={"brand.borderColors.900"}
            _hover={{
              color: labelColor,
              cursor: "pointer",
            }}
          />
        </Flex>
      </Box>
      <Box
        as="section"
        w={"300px"}
        overflowY={"auto"}
        overscrollBehaviorY={"contain"}
        mt={4}
        h={"calc(100vh - 250px)"}
        css={{
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
        }}
      >
        {arrayTask.map((element) => (
          <TaskCard
            id={element.id}
            key={element.id}
            title={element.title}
            description={element.description}
            onClick={() => {
              setTaskId(element.id);
              onOpen();
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ButtonLabel;
