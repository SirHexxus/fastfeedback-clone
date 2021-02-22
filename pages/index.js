import { useAuth } from '@/lib/auth';
import { GithubIcon, GoogleIcon, LogoIcon } from '@/styles/icons';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
        <title>Fast Feedback Clone</title>
      </head>

      <LogoIcon color="#000000" name="logo" boxSize={16} />
      <Text mb={4} fontSize="lg" p={6}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {` is the fastest and easiest way to add comments or reviews to your static site. It's still a work in progress, but you can check it out by logging in.`}
      </Text>

      {auth.user ? (
        <Button
          as="a"
          href="/dashboard"
          mt={4}
          size="lg"
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          fontWeight="medium"
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
        >
          View Dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            leftIcon={<GithubIcon />}
            mt={4}
            size="lg"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
            onClick={(e) => auth.signinWithGithub()}
          >
            Sign In with GitHub
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            mt={4}
            size="lg"
            onClick={(e) => auth.signinWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
}
