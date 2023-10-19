"use client";

import { FC, useState } from "react";
import { Box, Button, Center, Heading, Icon, useToast } from "@chakra-ui/react";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { api } from "@/app/api";

const schema = yup.object({
  name: yup.string().required("Nome obrigatório").min(3, "Nome inválido"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

type ISchema = yup.InferType<typeof schema>;

const SeusDetalhes: FC = () => {
  const { push } = useRouter();
  const toast = useToast();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleShowPassword1 = () => setShowPassword1((oldValue) => !oldValue);
  const handleShowPassword2 = () => setShowPassword2((oldValue) => !oldValue);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISchema> = async (data, e) => {
    e?.preventDefault();
    try {
      delete data.confirmPassword;
      await api.post("/auth/register", data);
      push("/login");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center
        flexDir={"column"}
        w="100vw"
        h="100vh"
        p={{
          base: "0 1rem",
          md: "0",
        }}
      >
        <Box
          w={{ base: "100%", md: "400px" }}
          textAlign={"center"}
          p={{ base: "0 1rem", md: "0" }}
        >
          <Heading
            as="h1"
            fontWeight={900}
            fontSize="4xl"
            mb={2}
            textAlign="center"
            color="brand.primary.500"
          >
            inFinity App
          </Heading>
          <Heading
            fontSize="1.2rem"
            fontWeight={700}
            mb={8}
            color="white"
            letterSpacing={2.5}
          >
            Preencha seus detalhes
          </Heading>
          <Input
            label="Nome*"
            placeholder="Ex: João da Silva"
            mb={6}
            variant="secondary"
            {...register("name")}
            error={errors.name}
            onChange={(e) => setValue("name", e.target.value)}
          />
          <Input
            label="E-mail*"
            placeholder="Ex: example@gmail.com"
            mb={6}
            variant="secondary"
            {...register("email")}
            onChange={(e) => setValue("email", e.target.value)}
            error={errors.email}
          />
          <Input
            label="Senha*"
            placeholder="Ex: ********"
            type={showPassword1 ? "text" : "password"}
            mb={6}
            {...register("password")}
            onChange={(e) => setValue("password", e.target.value)}
            error={errors.password}
            variant="secondary"
            iconRight={
              <Icon
                as={showPassword1 ? EyeSlash : Eye}
                fontSize="2xl"
                onClick={handleShowPassword1}
                cursor="pointer"
                p={0.5}
                color="brand.text.300"
                mb={8}
              />
            }
          />
          <Input
            label="Confirmar senha*"
            placeholder="Ex: ********"
            type={showPassword2 ? "text" : "password"}
            mb={8}
            variant="secondary"
            {...register("confirmPassword")}
            onChange={(e) => setValue("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            iconRight={
              <Icon
                as={showPassword2 ? EyeSlash : Eye}
                fontSize="2xl"
                onClick={handleShowPassword2}
                cursor="pointer"
                p={0.5}
                color="brand.text.300"
                mb={8}
              />
            }
          />
          <Button
            variant="primary"
            mt={4}
            w={"100%"}
            fontSize={"1rem"}
            type="submit"
          >
            Cadastrar
          </Button>
        </Box>
      </Center>
    </form>
  );
};

export default SeusDetalhes;
