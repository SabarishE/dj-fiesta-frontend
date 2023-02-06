import {
  Box,
  FormLabel,
  Input,
  useToast,
  Text,
  chakra,
} from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { login, error } = authContextValues;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <Layout title="User log in">
      <Box
        w={["300px", "400px"]}
        boxShadow="0 0 8px 4px #c9e0ff"
        p={5}
        mx="auto"
      >
        <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
        >
          Log in
        </Text>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="#c9e0ff"
              required
            />
          </Box>
          <Box mt={2}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="#c9e0ff"
              required
            />
          </Box>
          <Input
            type="submit"
            value="Log in"
            bg="blue.800"
            color="white"
            _hover={{}}
            _active={{}}
            cursor="pointer"
            marginTop="20px"
          />
        </form>
        <Text mt={4} fontSize="14px">
          Don&apos;t have an account?{" "}
          <Link href="/account/register">
            <chakra.span color="blue" textDecoration="underline">
              Register
            </chakra.span>
          </Link>
        </Text>
      </Box>
    </Layout>
  );
};

export default Login;
