import { useAuth } from '@/lib/auth';
// import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import { Box, Button } from '@chakra-ui/react';

const Account = () => {
  const { user } = useAuth();
  //   const { data } = useSWR(user ? ['/api/user', user.token] : null, fetcher);

  // console.log(data);
  //   if (!data) {
  //     return (
  //       <DashboardShell>
  //         <SiteTableHeader />
  //         <SiteTableSkeleton />
  //       </DashboardShell>
  //     );
  //   }

  return (
    <DashboardShell>
      <Box>
        <Button
          mt={4}
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={(e) => createCheckoutSession(user.uid)}
        >
          Update Subscription to Free
        </Button>
        <Button
          mt={4}
          ml={4}
          size="lg"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={(e) => goToBillingPortal()}
        >
          Review Billing Portal
        </Button>
      </Box>
    </DashboardShell>
  );
};

export default Account;
