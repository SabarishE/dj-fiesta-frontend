import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { events_per_page } from "config";
import Link from "next/link";

export const Pagination = ({
  page,
  totalEvents,
}: {
  page: number;
  totalEvents: number;
}) => {
  const lastPage = Math.ceil(totalEvents / events_per_page);
  return (
    <HStack>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <Button
            bg="blue.800"
            color="white"
            _hover={{}}
            _active={{}}
            size="sm"
          >
            Prev
          </Button>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <Button
            bg="blue.800"
            color="white"
            _hover={{}}
            _active={{}}
            size="sm"
          >
            Next
          </Button>
        </Link>
      )}
    </HStack>
  );
};
