import {
  HStack,
  Image,
  VStack,
  Text,
  Button,
  Box,
  chakra,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { EventInterface } from "types/event";

export const EventItem = ({ event }: { event: EventInterface }) => {
  const router = useRouter();

  return (
    <Stack
      direction={["column", "row", "row"]}
      p={2}
      alignItems="stretch"
      boxShadow="0 0 8px 4px #c9e0ff"
      my={4}
      spacing={["unset", 4]}
    >
      {" "}
      <Image
        src={
          event.image.data
            ? event.image.data.attributes.formats.thumbnail.url
            : "/images/event-default.png"
        }
        w={["100%", "150px"]}
        h={["200px", "120px"]}
        alt="thumbnail"
      />
      <VStack alignItems="flex-start" spacing={1}>
        <Text
          fontSize={["16px", "20px", "24px"]}
          lineHeight="24px"
          fontWeight="semibold"
        >
          {event.name}
        </Text>
        <Text fontSize={["12px", "14px", "16px"]}>
          <chakra.span fontWeight="semibold" fontSize="14px">
            When :{" "}
          </chakra.span>
          {new Date(event.date).toDateString()} at {event.time}
        </Text>
        <Text fontSize={["12px", "14px", "16px"]}>
          <chakra.span fontWeight="semibold" fontSize="14px">
            Where :{" "}
          </chakra.span>
          {event.venue}
        </Text>
        <Button
          bg="#c9e0ff"
          color="blue.800"
          onClick={() => router.push(`/events/${event.slug}`)}
          _hover={{}}
          _active={{}}
          size="sm"
        >
          Details
        </Button>
      </VStack>
    </Stack>
  );
};
