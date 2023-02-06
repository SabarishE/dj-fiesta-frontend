import { Heading } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import Link from "next/link";

const InternalServerError = () => {
  return (
    <Layout title="404">
      <Heading>404 , Sorry there is nothing in here</Heading>
      <Link href="/">Go back home</Link>
    </Layout>
  );
};

export default InternalServerError;
