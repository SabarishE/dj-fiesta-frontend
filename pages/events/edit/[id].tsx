import {
  Box,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
  Text,
  useDisclosure,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { UploadImageModal } from "components/UploadImageModal";
import { API_URL } from "config";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ChangeEvent, FormEvent, useState } from "react";
import { EventDataInterface } from "types/event";
import { parseCookie } from "utility";

interface ParamsInterface extends ParsedUrlQuery {
  id: string;
}

const EditEventPage = ({
  eventData,
  token,
}: {
  eventData: EventDataInterface;
  token: string;
}) => {
  const eventId = eventData.id;
  const event = eventData.attributes;

  const [imagePreview, setImagePreview] = useState(
    event.image.data ? event.image.data.attributes.formats.thumbnail.url : null
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: new Date(event.date).toISOString().substr(0, 10),
    time: event.time,
    description: event.description,
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

    const res = await fetch(`${API_URL}/api/events/${eventId}`, {
      method: "PUT",
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
        title: `Event updated successfully`,
        status: "success",
      });
      router.push(`/events/${event.slug}`);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${eventId}`);
    const data = await res.json();

    setImagePreview(
      data.data.attributes.image.data[0].attributes.formats.thumbnail.url
    );
  };

  return (
    <Layout title="Update event">
      <Box maxW="800px" mx="auto">
        <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
          mb={6}
        >
          Update event
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
            value="Update"
            bg="blue.800"
            color="white"
            _hover={{}}
            _active={{}}
            cursor="pointer"
            marginTop="20px"
          />
        </form>

        {/*  Image upload bug    */}

        {/* <Text
          fontSize={["18px", "28px"]}
          fontWeight="semibold"
          color="blue.800"
          my={6}
        >
          Event image preview
        </Text>
        {imagePreview ? (
          <Box>
            <Image src={imagePreview} w="250px" h="200px" />
            <Button onClick={onOpen}>Edit image</Button>
          </Box>
        ) : (
          <Box>
            <Box>Image not uploaded</Box>
            <Button onClick={onOpen}>upload image</Button>
          </Box>
        )} */}
      </Box>
      <UploadImageModal
        isOpen={isOpen}
        onClose={onClose}
        eventId={eventId}
        imageUploaded={imageUploaded}
        token={token}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  eventData: EventDataInterface;
  token: string;
}> = async (context) => {
  const { req } = context;
  const { id } = context.params as ParamsInterface;
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);

  const data = await res.json();

  const eventData = data.data;

  return {
    props: { eventData, token },
  };
};

export default EditEventPage;
