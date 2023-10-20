"use client";

import { useContext } from "react";
import Header from "./components/Header";
import ButtonLabel from "./components/ButtonLabel";
import { Flex } from "@chakra-ui/react";
import { ModalCreateTaskAndUpdate } from "./components/ModalCreateTaskAndUpdate";
import { useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "./context/AuthContext";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasksDone, tasksInProgress, tasksReview, tasksToDo } =
    useContext(AuthContext);

  return (
    <>
      <ModalCreateTaskAndUpdate isOpen={isOpen} onClose={onClose} />
      <Header />
      <Flex
        px={["6", "8"]}
        py={["6", "8"]}
        gap={10}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <ButtonLabel
          label="TO DO"
          lenght={tasksToDo.length}
          action={() => onOpen()}
          labelColor={"brand.primary.600"}
          arrayTask={tasksToDo}
        />

        <ButtonLabel
          label="IN PROGRESS"
          lenght={tasksInProgress.length}
          action={() => onOpen()}
          labelColor={"brand.orange.500"}
          arrayTask={tasksInProgress}
        />
        <ButtonLabel
          label="REVIEW"
          lenght={tasksReview.length}
          action={() => onOpen()}
          labelColor={"purple.600"}
          arrayTask={tasksReview}
        />
        <ButtonLabel
          label="DONE"
          lenght={tasksDone.length}
          action={() => onOpen()}
          labelColor={"brand.green.400"}
          arrayTask={tasksDone}
        />
      </Flex>
    </>
  );
}
