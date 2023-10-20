"use client";

import { FC, useEffect, useState, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Button,
  Text,
  Grid,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Input } from "../Input";
import Select from "react-select";
import { api } from "@/app/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "@/app/context/AuthContext";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
}

export const ModalCreateTaskAndUpdate: FC<IProps> = ({
  isOpen,
  onClose,
  taskId,
}) => {
  const { user, loadTasks } = useContext(AuthContext);
  const [users, setUsers] = useState([] as any);
  const [userSearch, setUserSearch] = useState("");
  const [userSelectedId, setUserSelectedId] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);

  const toast = useToast();

  const { register, handleSubmit, setValue } = useForm();

  const loadUsers = async () => {
    if (userSearch === "") {
      const { data } = await api.get("/users/all");
      setUsers(data.data);
      return;
    }
    setUsers(
      users.filter((user: any) =>
        user.name.toLowerCase().includes(userSearch.toUpperCase().trim())
      )
    );
  };

  const onSubmit: SubmitHandler<any> = async (data, e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const taskData = {
        ...data,
        userId: userSelectedId,
        status: statusSelected,
        creatorId: user.id,
      };

      if (taskId) {
        await api.patch(`/tasks/${taskId}`, taskData);
        handleSuccess("Tarefa atualizada com sucesso!");
        resetForm();
        onClose();
        loadTasks();
        loadTask();
      } else if (!isValidTask(data)) {
        showError("Erro ao criar tarefa", "Preencha os campos obrigatórios");
      } else {
        await api.post("/tasks/create", taskData);
        handleSuccess("Tarefa criada com sucesso!");
        resetForm();
        onClose();
        loadTasks();
      }
    } catch (error: any) {
      console.log(error);
      showError("Erro ao criar tarefa", error.response.data.message);
    }
  };

  function handleSuccess(message: string) {
    toast({
      title: "Sucesso",
      description: message,
      status: "success",
    });
  }

  function showError(title: string, description: string) {
    toast({
      title,
      description,
      status: "error",
    });
  }

  function isValidTask(data: any) {
    return !!(data.title && data.description && statusSelected);
  }

  function resetForm() {
    setValue("title", "");
    setValue("description", "");
    setUserSearch("");
    setUserSelectedId(null);
    setStatusSelected(null);
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, [userSearch]);

  const loadTask = async () => {
    await api
      .get(`/tasks/${taskId}`)
      .then(({ data }) => {
        setValue("title", data.data.title);
        setValue("description", data.data.description);
        setUserSelectedId(data.data.user?.id);
        setStatusSelected(data.data.status);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (taskId) {
      loadTask();
    }
    // eslint-disable-next-line
  }, [taskId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader
            borderBottomWidth={"1px"}
            borderColor={"brand.borderColors.900"}
            mb={4}
          >
            <Text color={"brand.text.200"} fontWeight={"bold"}>
              Create Task
            </Text>
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder={"Title"}
              {...register("title", { required: true })}
              onChange={(e: any) => setValue("title", e.target.value)}
              height={50}
            />
            <Grid templateColumns={"1fr 1fr"} gap={4} mt={4} mb={4}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                aria-label="Status"
                options={[
                  { value: "TODO", label: "To Do" },
                  { value: "IN_PROGRESS", label: "In Progress" },
                  { value: "REVIEW", label: "Review" },
                  { value: "DONE", label: "Done" },
                ]}
                onChange={(e: any) => setStatusSelected(e.value)}
                placeholder={"Status" || statusSelected}
                value={statusSelected}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "1px solid #E2E8F0",
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    boxShadow: "none",
                    height: 50,
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }),
                  option: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    color: "#4A5568",
                    "&:hover": {
                      backgroundColor: "#E2E8F0",
                    },
                  }),
                }}
              />
              <Select
                className="basic-single"
                placeholder={"User Assigned" || userSearch}
                onChange={(e: any) => {
                  setUserSelectedId(e.value);
                  setUserSearch(e.label);
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "1px solid #E2E8F0",
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    boxShadow: "none",
                    height: 50,
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }),
                  option: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    color: "#4A5568",
                    "&:hover": {
                      backgroundColor: "#E2E8F0",
                    },
                  }),
                }}
                options={users.map((user: any) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            </Grid>
            <Textarea
              placeholder={"Description"}
              {...register("description", { required: true })}
              onChange={(e: any) => setValue("description", e.target.value)}
            />
            <Text color={"brand.text.200"} fontWeight={"bold"} mt={4}>
              *OBS: Os campos obrigatórios são: Title, Description e Status*
            </Text>
          </ModalBody>
          <ModalFooter
            borderTopWidth={"1px"}
            borderColor={"brand.borderColors.900"}
            mt={4}
          >
            <Button
              variant={"outline"}
              onClick={onClose}
              colorScheme={"brand.primary"}
              mr={4}
            >
              Cancel
            </Button>
            <Button colorScheme={"brand.primary"} type={"submit"}>
              {taskId ? "Update Task" : "Create Task"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
