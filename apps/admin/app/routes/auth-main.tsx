import { Button } from '@/components/ui/button';
import { Link } from '@remix-run/react';
import { css } from '_panda/css';
import { Center, Flex, Grid } from '_panda/jsx';
import { h2, p } from '_panda/recipes';
import React from 'react';

function AuthMainPage() {
  return (
    <Grid gridTemplateColumns="1fr 1fr" h="100vh">
      <Flex bg="#212121" justifyContent="flex-end" p={4} flexDirection="column">
        <p
          className={
            (p(),
            css({
              color: 'white.white',
              fontSize: '20px',
              fontWeight: '500',
            }))
          }
        >
          GitAnimals
        </p>
        <p
          className={
            (p(),
            css({
              color: 'white.white',
              fontWeight: '500',
            }))
          }
        >
          Have pet in your github <br />
        </p>
      </Flex>
      <Center bg="white.white" flexDirection={'column'} p={4}>
        <h1 className={h2()}>GitAnimals Admin</h1>
        <p className={(p(), css({ fontWeight: '500', my: '16px', color: 'gray.600' }))}>Please Github OAuth Login</p>

        <Link to="/auth">
          <Button mt={4} size="lg">
            Login
          </Button>
        </Link>
      </Center>
    </Grid>
  );
}

export default AuthMainPage;
