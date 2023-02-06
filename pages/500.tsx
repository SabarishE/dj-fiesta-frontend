import { Heading } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import Link from "next/link";

const InternalServerError = () => {
  return (
    <Layout title="500">
      <Heading>500 , Sorry an internal server error occured</Heading>
      <Link href="/">Go back home</Link>
    </Layout>
  );
};

export default InternalServerError;
