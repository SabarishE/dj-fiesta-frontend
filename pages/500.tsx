import { Heading } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import Link from "next/link";

const InternalServerError = () => {
  return (
    <Layout title="404">
      <Heading>500 , Sorry an interna; server error occured</Heading>
      <Link href="/">Go back home</Link>
    </Layout>
  );
};

export default InternalServerError;
