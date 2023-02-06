import {
  Box,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { API_URL } from "config";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export const UploadImageModal = ({
  isOpen,
  onClose,
  eventId,
  imageUploaded,
  token,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  imageUploaded: () => void;
  token: string;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UploadImage
            eventId={eventId}
            imageUploaded={imageUploaded}
            token={token}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const UploadImage = ({
  eventId,
  imageUploaded,
  token,
}: {
  eventId: number;
  imageUploaded: () => void;
  token: string;
}) => {
  const [Image, setImage] = useState<File | null>(null);

  const toast = useToast();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!Image) {
      toast({
        title: `Please upload an image`,
        status: "warning",
      });
      return;
    }

    const formData = new FormData();

    formData.append("files", Image);
    formData.append("ref", "event");
    formData.append("refId", `${eventId}`);
    formData.append("field", "image");
    // formData.append("source", picture.source);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
        title: "Image uploaded successfully",
        status: "success",
      });
      imageUploaded();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="upload image" />
        </Box>{" "}
      </form>
    </Box>
  );
};
