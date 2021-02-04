import { useAuth } from '@/lib/auth';
import { LogoIcon, GithubIcon, GoogleIcon } from '@/styles/icons';
import { Button, Code, Flex, Heading, Text } from '@chakra-ui/react';
// import styles from '../styles/Home.module.css';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <head>
        <title>Fast Feedback Clone</title>
      </head>

      <LogoIcon color="#000000" name="logo" boxSize={16} />

      {auth.user ? (
        <Button
          as="a"
          href="/dashboard"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          maxW="200px"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="small" onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
