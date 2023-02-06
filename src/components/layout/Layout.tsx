import { Box, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Showcase } from "../Showcase";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  title,
  description,
  keywords,
  children,
}: {
  title: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <VStack alignItems="stretch" py={20} spacing={0}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <Box px={[4, null, 10]} py={[14]}>
        {children}
      </Box>
      <Footer />
    </VStack>
  );
};
