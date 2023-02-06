import {
  Box,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { API_URL } from "config";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { EventDataInterface } from "types/event";
import { parseCookie } from "utility";

const AddEventPage = ({ token }: { token: string }) => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const toast = useToast();
  const emptyFieldsId = "empty-fields-toast";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      if (!toast.isActive(emptyFieldsId)) {
        toast({
          id: emptyFieldsId,
          title: `Please fill out all the fields`,
          status: "warning",
        });
      }
      return;
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 401 || 403) {
        toast({
          title: `Token not provided`,
          status: "error",
        });
        return;
      }
      toast({
        title: `Something went wrong`,
        status: "error",
      });
    } else {
      toast({
        title: `Event created successfully`,
        status: "success",
      });
      const event = await res.json();

      router.push(`/events/${event.slug}`);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Create event">
      <Box maxW="800px" mx="auto">
        <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
          mb={6}
        >
          Create event
        </Text>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={[1, 2, 2]} spacing={4}>
            <Box>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
            <Box>
              <FormLabel htmlFor="performers">Performers</FormLabel>
              <Input
                type="text"
                name="performers"
                id="performers"
                value={values.performers}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
            <Box>
              <FormLabel htmlFor="venue">Venue</FormLabel>
              <Input
                type="text"
                name="venue"
                id="venue"
                value={values.venue}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
            <Box>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
            <Box>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                type="date"
                name="date"
                id="date"
                value={values.date}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
            <Box>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Input
                type="text"
                name="time"
                id="time"
                value={values.time}
                onChange={handleInputChange}
                borderColor="#c9e0ff"
                required
              />
            </Box>
          </SimpleGrid>
          <Box mt={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              name="description"
              id="description"
              onChange={handleInputChange}
              value={values.description}
              resize="none"
              borderColor="#c9e0ff"
              required
            />
          </Box>
          <Input
            type="submit"
            value="Create"
            bg="blue.800"
            color="white"
            _hover={{}}
            _active={{}}
            cursor="pointer"
            marginTop="20px"
          />
        </form>
      </Box>
    </Layout>
  );
};

export default AddEventPage;

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async (context) => {
  const { req } = context;

  const { token } = parseCookie(req);

  return {
    props: { token },
  };
};
