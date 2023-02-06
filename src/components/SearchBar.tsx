import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchOutline } from "@emotion-icons/evaicons-outline/SearchOutline";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export const SearchBar = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/events/search?term=${searchTerm}`);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <InputGroup borderColor="blue.800">
          <InputLeftElement pointerEvents="none">
            <SearchOutline size="25px" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search here..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </form>
    </Box>
  );
};
