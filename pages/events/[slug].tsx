import { Text, Image, Box, useToast, chakra } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { API_URL } from "config";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { EventDataInterface, EventInterface } from "types/event";
import { ChevronsLeft } from "@emotion-icons/boxicons-regular/ChevronsLeft";

interface ParamsInterface extends ParsedUrlQuery {
  slug: string;
}

const Event = ({ eventData }: { eventData: EventDataInterface }) => {
  const router = useRouter();

  if (router.isFallback) return null;

  console.log("event selected", eventData);

  const event = eventData.attributes;

  return (
    <Layout title="Event">
      <Box maxW="750px" mx="auto">
        <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
        >
          {event.name}
        </Text>
        <Box>
          <Text>
            {new Date(event.date).toDateString()} at {event.time}
          </Text>
          <Image
            src={
              event.image.data
                ? event.image.data.attributes.formats.medium.url
                : "/images/event-default.png"
            }
            my={4}
            alt={"event-image"}
          />
          <Box mb={4}>
            <Text
              fontSize={["18px", "20px"]}
              fontWeight="semibold"
              color="blue.800"
              textDecoration="underline"
            >
              Performers
            </Text>
            <Text fontSize={["14px", "16px"]}>{event.performers}</Text>
          </Box>
          <Box mb={4}>
            <Text
              fontSize={["18px", "20px"]}
              fontWeight="semibold"
              color="blue.800"
              textDecoration="underline"
            >
              Description
            </Text>
            <Text fontSize={["14px", "16px"]}>{event.description}</Text>
          </Box>
          <Box mb={4}>
            <Text
              fontSize={["18px", "20px"]}
              fontWeight="semibold"
              color="blue.800"
              textDecoration="underline"
            >
              Location
            </Text>
            <Text fontSize={["14px", "16px"]}>{event.venue},</Text>
            <Text fontSize={["14px", "16px"]}>{event.address}</Text>
          </Box>
        </Box>
        <chakra.span
          color="blue"
          fontSize="14px"
          cursor="pointer"
          onClick={() => router.push("/events")}
        >
          <ChevronsLeft size="16px" />
          Go back
        </chakra.span>
      </Box>
    </Layout>
  );
};

export default Event;

// export const getStaticPaths = async () => {
//   const res = await fetch(`${API_URL}/api/events`);
//   const data = await res.json();

//   const paths = data.data.map(
//     (event: { attributes: EventInterface; id: number }) => ({
//       params: {
//         slug: event.attributes.slug,
//       },
//     })
//   );

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<{
//   eventData: EventDataInterface;
// }> = async (context) => {
//   const { slug } = context.params as ParamsInterface;

//   const res = await fetch(
//     `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
//   );
//   const data = await res.json();
//   const eventData = data.data[0];

//   return {
//     props: { eventData },
//     revalidate: 1,
//   };
// };

export const getServerSideProps: GetServerSideProps<{
  eventData: EventDataInterface;
}> = async (context) => {
  const { slug } = context.query as ParamsInterface;

  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );

  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  const eventData = data.data[0];

  return {
    props: { eventData },
  };
};
