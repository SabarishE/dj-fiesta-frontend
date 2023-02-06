import Head from "next/head";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { API_URL } from "config";
import { EventInterface } from "types/event";
import { Fragment, useEffect, useState } from "react";
import { EventItem } from "components/EventItem";
import { useRouter } from "next/router";

export default function Home({ events }: { events: EventInterface[] }) {
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

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
            mb={6}
          >
            Upcoming events
          </Text>
          <Box>
            {events.length === 0 ? (
              <Heading>No events to show</Heading>
            ) : (
              events.slice(0, 3).map((event, index) => {
                return (
                  <Fragment key={index}>
                    <EventItem event={event} />
                  </Fragment>
                );
              })
            )}
          </Box>
          {events.length > 0 && (
            <Button
              bg="blue.800"
              color="white"
              onClick={() => router.push(`/events`)}
              _hover={{}}
              _active={{}}
            >
              View all events
            </Button>
          )}
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=data:ASC`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: `/500`,
        permanent: false,
      },
    };
  }

  const events = data.data.map(
    (event: { attributes: EventInterface; id: number }) => {
      return event.attributes;
    }
  );

  return {
    props: { events },
  };
}
