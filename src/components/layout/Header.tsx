import {
  Box,
  Button,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

import { Menu as HamburgerMenu } from "@emotion-icons/heroicons-outline/Menu";
import { SearchBar } from "components/SearchBar";

export const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { user, logout } = authContextValues;

  return (
    <Box
      py={[5]}
      px={[4, null, 10]}
      pos="fixed"
      top={0}
      left="0"
      right="0"
      zIndex={10}
      bg="white"
      boxShadow="0 4px 16px #c9e0ff"
    >
      <HStack
        alignItems="center"
        justifyContent="space-between"
        color="blue.800"
        maxW="1600px"
        zIndex={10}
        mx="auto"
      >
        <Link href="/">
          <Text fontSize={["18px", "32px"]} fontWeight="semibold">
            DJ Fiesta
          </Text>
        </Link>

        {isMobile ? (
          <MobileMenu />
        ) : (
          <HStack>
            {user ? (
              <>
                <SearchBar />
                <Link href="/events">
                  <Button
                    bg="#c9e0ff"
                    color="blue.800"
                    size={["sm", "md"]}
                    _hover={{}}
                    _active={{}}
                  >
                    Events
                  </Button>
                </Link>
                <Link href="/events/add">
                  <Button
                    bg="#c9e0ff"
                    color="blue.800"
                    size={["sm", "md"]}
                    _hover={{}}
                    _active={{}}
                  >
                    Add event
                  </Button>
                </Link>
                <Link href="/account/dashboard">
                  <Button
                    bg="#c9e0ff"
                    color="blue.800"
                    size={["sm", "md"]}
                    _hover={{}}
                    _active={{}}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => logout()}
                  bg="#c9e0ff"
                  color="blue.800"
                  size={["sm", "md"]}
                  _hover={{}}
                  _active={{}}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Link href="/account/login">
                <Button bg="#c9e0ff" color="blue.800" _hover={{}} _active={{}}>
                  Log in
                </Button>
              </Link>
            )}
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export const MobileMenu = () => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { user, logout } = authContextValues;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerMenu size="24px" />}
        variant="outline"
        _hover={{}}
        _active={{}}
      />
      <MenuList>
        {user ? (
          <>
            <MenuItem>
              <SearchBar />
            </MenuItem>
            <MenuItem>
              <Link href="/events">Events</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/events/add">Add event</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/account/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={() => logout()}>Log out</MenuItem>
          </>
        ) : (
          <MenuItem>
            <Link href="/account/login">Log in</Link>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
