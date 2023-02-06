import { Box, Heading } from "@chakra-ui/react";

export const Showcase = () => {
  return (
    <Box
      background={"black url('/images/showcase.jpg')"}
      h="300px"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundColor="rgba(0, 0, 0, .65)"
      backgroundBlendMode="darken"
      pos="relative"
      display={["none", "block"]}
      px={[4, null, 10]}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
      >
        <Heading textAlign="center" color="white" mb={4}>
          Welcome to DJ Fiesta !
        </Heading>
        <Heading size="md" textAlign="center" color="white">
          Checkout latest dj events
        </Heading>
      </Box>
    </Box>
  );
};
