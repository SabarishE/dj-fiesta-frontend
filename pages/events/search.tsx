import Head from "next/head";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { API_URL } from "config";
import { EventInterface } from "types/event";
import { Fragment } from "react";
import { EventItem } from "components/EventItem";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import qs from "qs";
import { useRouter } from "next/router";
import { AlertTriangleOutline } from "@emotion-icons/evaicons-outline/AlertTriangleOutline";
interface ParamsInterface extends ParsedUrlQuery {
  term: string;
}

export default function SearchPage({ events }: { events: EventInterface[] }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Home">
        <Box maxW="800px" mx="auto">
          <Text
            fontSize={["18px", "28px"]}
            fontWeight="semibold"
            color="blue.800"
          >
            Search results for &quot;{router.query.term}&quot;
          </Text>
          <Box>
            {events.length === 0 ? (
              <HStack justifyContent="center" py={10}>
                <AlertTriangleOutline size="16px" />
                <Text
                  fontWeight="semibold"
                  fontSize={["12px", "16px"]}
                  lineHeight={["16px", "18px"]}
                >
                  No events to display
                </Text>
              </HStack>
            ) : (
              events.map((event, index) => {
                return (
                  <Fragment key={index}>
                    <EventItem event={event} />
                  </Fragment>
                );
              })
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  events: EventInterface[];
}> = async (context) => {
  const { term } = context.query as ParamsInterface;
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          { description: { $contains: term } },
          { venue: { $contains: term } },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`);
  const data = await res.json();

  const events = data.data.map(
    (event: { attributes: EventInterface; id: number }) => {
      return event.attributes;
    }
  );

  return {
    props: { events },
  };
};
