import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      bg="blue.800"
      color="#c9e0ff"
      pos="fixed"
      bottom="0"
      left="0"
      right="0"
    >
      <Box
        py={[5]}
        px={[4, null, 10]}
        maxW="1600px"
        mx="auto"
        textAlign="center"
      >
        <Text fontSize={["12px", "16px"]}>
          Copyright &#169; 2023 DJ Fiesta. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};
