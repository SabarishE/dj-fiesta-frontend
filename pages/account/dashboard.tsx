import { Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { API_URL } from "config";
import { GetServerSideProps } from "next";
import { parseCookie } from "utility";
import { EventInterface, EventDataInterface } from "types/event";
import { useRouter } from "next/router";
import { EditOutline } from "@emotion-icons/evaicons-outline/EditOutline";
import { DeleteOutline } from "@emotion-icons/material-twotone/DeleteOutline";
import { AlertTriangleOutline } from "@emotion-icons/evaicons-outline/AlertTriangleOutline";

const Dashboard = ({
  eventsData,
  token,
}: {
  eventsData: EventDataInterface[];
  token: string;
}) => {
  const router = useRouter();
  const toast = useToast();

  const events = eventsData.map(
    (event: { attributes: EventInterface; id: number }) => {
      return { ...event.attributes, id: event.id };
    }
  );

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteEventHandler = async (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || 403) {
          toast({
            title: `Token not provided`,
            status: "error",
          });
          return;
        }
        toast({
          title: data.message,
          status: "error",
        });
      } else {
        toast({
          title: "Event deleted successfully",
          status: "success",
        });
        refreshData();
      }
    }
  };

  return (
    <Layout title="User dashboard">
      <Box maxW="1600px" mx="auto">
        <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
          mb={6}
        >
          My Dashboard
        </Text>

        <Box maxW="800px" mx="auto">
          <Box
            fontSize={["16px", "28px"]}
            fontWeight="semibold"
            color="blue.800"
            mb={6}
            px={[2, 4]}
            border="1px solid #c9e0ff"
          >
            Events
          </Box>
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
            <Box>
              {events.map((event) => {
                return (
                  <HStack
                    key={event.slug}
                    my={4}
                    px={[2, 4]}
                    justifyContent="space-between"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize={["12px", "16px"]}
                      lineHeight={["16px", "18px"]}
                    >
                      {event.name}
                    </Text>
                    <HStack>
                      <Button
                        onClick={() => router.push(`/events/edit/${event.id}`)}
                        _hover={{}}
                        _active={{}}
                        color="blue"
                        border="1px solid #c9e0ff"
                        bg="transparent"
                        leftIcon={<EditOutline color="blue" size="16px" />}
                        size={["sm", "md"]}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteEventHandler(event.id)}
                        _hover={{}}
                        _active={{}}
                        color="#E53E3E"
                        border="1px solid #c9e0ff"
                        bg="transparent"
                        leftIcon={<DeleteOutline color="#E53E3E" size="16px" />}
                        size={["sm", "md"]}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </HStack>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  eventsData: EventDataInterface[];
  token: string;
}> = async (context) => {
  const { req } = context;

  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/api/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  const eventsData = data.data;

  return {
    props: { eventsData, token },
  };
};

export default Dashboard;
