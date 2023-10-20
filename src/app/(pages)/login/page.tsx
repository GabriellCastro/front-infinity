"use client";

import { FC, useState, useContext } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Flex,
  Text,
  Checkbox,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/app/api";
import { AuthContext } from "@/app/context/AuthContext";
import { setCookie } from "nookies";

const schema = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

type ISchema = yup.InferType<typeof schema>;

const Login: FC = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((oldValue) => !oldValue);

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
      const { data: response } = await api.post("/auth/login", data);
      setCookie(null, "token", response.data.token);
      setUser(response.data.user);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao logar",
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
          w={{
            base: "100%",
            md: "400px",
          }}
        >
          <Heading
            as="h1"
            fontWeight={900}
            fontSize="4xl"
            mb={8}
            textAlign="center"
            color="brand.primary.500"
          >
            inFinity App
          </Heading>
          <Heading
            fontSize="1.2rem"
            fontWeight={500}
            mb={8}
            color="brand.text.450"
          >
            Bem-vindo! Por favor, coloque seus detalhes.
          </Heading>
          <Box>
            <Input
              label="E-mail*"
              placeholder="Ex: example@gmail.com"
              mb={8}
              variant="secondary"
              {...register("email")}
              onChange={(e) => setValue("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Senha*"
              placeholder={showPassword ? "Ex: qwe123" : "Ex: ********"}
              mb={8}
              variant="secondary"
              {...register("password")}
              onChange={(e) => setValue("password", e.target.value)}
              error={errors.password}
              type={showPassword ? "text" : "password"}
              iconRight={
                <Icon
                  as={showPassword ? EyeSlash : Eye}
                  fontSize="2xl"
                  onClick={handleShowPassword}
                  cursor="pointer"
                  p={0.5}
                  color="brand.text.300"
                  mb={8}
                />
              }
            />
            <Flex justifyContent="space-between" mb={8}>
              <Checkbox
                colorScheme="white"
                color="white"
                borderColor="white"
                size="lg"
                fontWeight={400}
                mr={2}
              >
                <Text fontSize="sm">Lembrar por 30 dias</Text>
              </Checkbox>
            </Flex>
            <Button
              variant="primary"
              mb={8}
              w={"100%"}
              fontSize={"md"}
              fontWeight={700}
              type="submit"
            >
              Entrar
            </Button>
          </Box>
          <Text
            fontSize="sm"
            fontWeight={400}
            mb={8}
            color="brand.text.450"
            textAlign="center"
          >
            Não tem uma conta?{" "}
            <Button
              variant="link"
              color="brand.primary.500"
              borderBottom="1px solid transparent"
              _hover={{
                borderBottom: "1px solid",
                borderColor: "brand.primary.500",
                color: "brand.primary.500",
                opacity: 0.8,
              }}
              borderRadius="none"
              fontWeight={400}
              ml={1}
              fontSize={"sm"}
              onClick={() => router.push("/cadastro/seus-detalhes")}
            >
              Cadastre-se
            </Button>
          </Text>
        </Box>
      </Center>
    </form>
  );
};

export default Login;
