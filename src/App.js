import {
  Image,
  Container,
  Heading,
  Stack,
  Link,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Code,
  Divider,
} from '@chakra-ui/react';
import React from 'react';

function App() {
  return (
    <Container py={12} pb={36}>
      <Stack spacing={6}>
        <Image
          src="/images/logo.svg"
          alt="Pepperoni Planet Logo"
          mx="auto"
          my={12}
          w="32"
        />

        <Heading size="sm">Design Engineer Take-home Project</Heading>
        <Heading size="xl">Pepperoni Planet Pizza Configurator</Heading>
        <Text fontSize="lg">
          Imagine you are a design engineer at Pepperoni Planet, and you're
          tasked with prototyping a single screen of the pizza ordering flow.
          You've been provided colors, a UI library called Chakra UI, and some
          assets from the design department.
        </Text>
        <Text>
          In a couple hours, we expect everyone will get some of the way through
          this prototype.{' '}
          <strong>The prototype is just that — a prototype</strong>. If invited
          to an on-site interview, you'll pair with us wherever you left off,
          because we'd much rather see how you work on a problem you're familiar
          with and have had time to think about than on some clever whiteboard
          puzzle we spring on you.
        </Text>
        <Divider />
        <Heading as="h4" size="md">
          Your task
        </Heading>
        <Text className="paragraph" fontWeight="bold">
          Imagine and prototype a fun and delightful pizza configuration screen.
        </Text>
        <Heading as="h4" size="md">
          Guidelines
        </Heading>
        <UnorderedList>
          <ListItem>
            Try to spend only a few hours on this, but you'll have a week.
          </ListItem>
          <ListItem>
            Just in case you were wondering, we won't use any of your work
            anywhere, we'll keep it between us.
          </ListItem>
          <ListItem>
            Index on fun and delight, when in doubt, make it more fun. You will
            be graded on how delightful this is to use. Go wild.
          </ListItem>
          <ListItem>
            It should still be usable — don't be boring…but don't get carried
            away.
          </ListItem>
        </UnorderedList>
        <Heading as="h4" size="md">
          Requirements
        </Heading>
        <OrderedList>
          <ListItem>
            People should be able to choose a size, we offer Small, Medium, and
            Monster.
          </ListItem>
          <ListItem>
            People should be able to choose their toppings, sorry no ½ or ¼
            toppings, gotta be the whole pie.
          </ListItem>
          <ListItem>
            People should be able to checkout and start over. Fwiw, you don't
            have to figure out anything beyond clicking the checkout button (it
            doesn't have to work).
          </ListItem>
        </OrderedList>
        <Heading as="h4" size="md">
          Resources
        </Heading>
        <UnorderedList>
          <ListItem>
            Image assets and colors are provided in the <Code>/public</Code>{' '}
            folder. You'll find images for pizzas, toppings, etc.{' '}
            <Link
              color="blue.600"
              textDecoration="underline"
              isExternal
              href="https://gamma.app/docs/Pepperoni-Planet-Brand-Guidelines-hndxmj5soxjpf9y?mode=doc"
            >
              Check out this gamma for the brand colors, logos and guidelines
              for Pepperoni Planet.
            </Link>
          </ListItem>
          <ListItem>
            The backend engineering team has provided a data-model for you. You
            can find at <Code>/src/data.js</Code>
          </ListItem>
        </UnorderedList>
        <Heading as="h4" size="md">
          Slack us
        </Heading>
        <Text className="paragraph">
          We'll be adding you to a Slack channel where the Gamma design team can
          help you answer any questions or if you get stuck on something. We'll
          try and be available as much as we can.
        </Text>
        <Heading as="h4" size="md">
          Oh, one last thing...
        </Heading>
        <Text className="paragraph" fontStyle="italic">
          We're looking for people who can take a simple task and make it
          delightful. We don't expect a robust or feature-complete solution, but
          we do expect a delightful one. When in doubt, do less, better :).
        </Text>
        <Image
          src="/images/mascot.png"
          alt="Peppy le Pepperoni"
          mx="auto"
          my={12}
          w="12"
        />
      </Stack>
    </Container>
  );
}

export default App;
