import {
  Image,
  Container,
  Heading,
  Stack,
  Button,
  Box,
  Text,
  HStack,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { data } from './data';
import PizzaVisualizer from './components/PizzaVisualizer';
import { motion } from 'framer-motion';
import { RepeatIcon } from '@chakra-ui/icons';
import Sparkle from './components/Sparkle';

function App() {
  const [size, setSize] = useState('medium');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [sparkleVisible, setSparkleVisible] = useState(false);

  const allToppings = data.categories.toppings.items;

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev => {
      const exists = prev.find(t => t.title === topping.title);
      if (exists) {
        return prev.filter(t => t.title !== topping.title);
      }
      return [...prev, topping];
    });
  };

  const handleReset = () => {
    setSize('medium');
    setSelectedToppings([]);
  };

  const handleFinish = () => {
    setSparkleVisible(true);
    setTimeout(() => setSparkleVisible(false), 2000);
  };

  return (
    <Flex 
      direction={{ base: 'column', lg: 'row' }} 
      minH="100vh"
    >
      {/* Left Side - Fixed Pizza Section */}
      <Box 
        w={{ base: '100%', lg: '67%' }}
        bg={size === 'monster' ? "pepperoni.600" : "starlight.100"}
        position={{ base: 'relative', lg: 'fixed' }}
        h={{ base: 'auto', lg: '100vh' }}
        left="0"
        top="0"
        transition="background-color 0.3s ease"
      >
        <Stack 
          spacing={8} 
          h="full" 
          py={8}
          px={4}
          align="center"
        >
          <Image
            src={size === 'monster' ? "/images/logo_2.svg" : "/images/logo.svg"}
            alt="Pepperoni Planet Logo"
            mx="auto"
            w="32"
            filter={size === 'monster' ? "brightness(0) invert(1)" : "none"}
            transition="all 0.2s ease"
          />
          
          {/* Pizza Visualizer - With overflow visible */}
          <Box 
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            position="relative"
            px={8}
            height="100%"
          >
            <Box 
              width="100%"
              height="100%"
              position="relative"
              mx="auto"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="visible"
            >
              <PizzaVisualizer 
                size={size}
                toppings={selectedToppings}
              />
            </Box>
          </Box>

          {/* Size Selection - All white when Monster selected */}
          <HStack spacing={8} pb={8} pl={1}>
            <Heading
              cursor="pointer"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="500"
              color={size === 'monster' 
                ? (size === 'small' ? "white" : "whiteAlpha.600")
                : (size === 'small' ? "pepperoni.600" : "pepperoni.200")
              }
              textTransform="capitalize"
              onClick={() => setSize('small')}
              _hover={{ 
                color: size === 'monster' ? "white" : "pepperoni.400",
                transform: "scale(1.1)"
              }}
              transition="all 0.2s ease"
              transform={size === 'small' ? "scale(1.1)" : "scale(1)"}
            >
              small
            </Heading>
            <Heading
              cursor="pointer"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="600"
              color={size === 'monster'
                ? (size === 'medium' ? "white" : "whiteAlpha.600")
                : (size === 'medium' ? "pepperoni.600" : "pepperoni.200")
              }
              textTransform="capitalize"
              onClick={() => setSize('medium')}
              _hover={{ 
                color: size === 'monster' ? "white" : "pepperoni.400",
                transform: "scale(1.1)"
              }}
              transition="all 0.2s ease"
              transform={size === 'medium' ? "scale(1.1)" : "scale(1)"}
            >
              medium
            </Heading>
            <Heading
              as={motion.h2}
              cursor="pointer"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="800"
              color={size === 'monster' ? "white" : "pepperoni.200"}
              textTransform="uppercase"
              onClick={() => setSize('monster')}
              _hover={{ 
                color: size === 'monster' ? "white" : "pepperoni.400"
              }}
              transition="color 0.2s ease"
              animate={size === 'monster' ? {
                scale: [1, 1.4, 1.1],
                rotate: [0, -3, 3, -3, 0],
              } : {
                scale: 1,
                rotate: 0
              }}
              
            >
              MONSTER
            </Heading>
          </HStack>
        </Stack>
      </Box>

      {/* Right Side - Scrollable Content */}
      <Box 
        w={{ base: '100%', lg: 'fit-content' }}
        ml={{ base: 0, lg: '67%' }}
        minH={{ base: '100vh', lg: 'auto' }}
        bg="white"
        position="relative"
        sx={{
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Stack 
          spacing={0} 
          pr={0}
          width="fit-content"
          pb={24}
        >
          <Heading 
            color="pepperoni.900" 
            fontSize={{ base: "3xl", md: "4xl" }}
            width="fit-content"
            textAlign="left"
            py={8}
            px={8}
          >
            Choose Your Toppings
          </Heading>

          {/* Toppings List */}
          <Stack 
            spacing={2}
            width="fit-content"
          >
            {allToppings.map((topping) => {
              const isSelected = selectedToppings.find(t => t.title === topping.title);
              return (
                <Button
                  key={topping.title}
                  onClick={() => handleToppingToggle(topping)}
                  variant="ghost"
                  size="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={2}
                  height="auto"
                  py={3}
                  width="fit-content"
                  _hover={{ bg: 'transparent' }}
                >
                  <Image 
                    src={`/images/${topping.filename}`} 
                    alt={topping.title}
                    w="16"
                    h="16"
                    transition="all 0.3s ease"
                    transform={isSelected ? "scale(1.6)" : "scale(1)"}
                  />
                  <Heading 
                    fontSize={{ base: "xl", md: "2xl" }}
                    color="pepperoni.600"
                    display="flex"
                    alignItems="center"
                    fontWeight={isSelected ? "semibold" : "normal"}
                  >
                    {topping.title}
                  </Heading>
                </Button>
              );
            })}
          </Stack>
        </Stack>

        {/* Fixed Bottom Container */}
        <Box
          position="fixed"
          bottom={0}
          right={0}
          left={{ base: 0, lg: '67%' }}
          bg="white"
          py={4}
          px={4}
          borderTop="1px"
          borderColor="gray.100"
          display="flex"
          justifyContent="center"
          gap={4}
          alignItems="center"
          zIndex={2}
        >
          <Button
            variant="ghost"
            onClick={handleReset}
            p={2}
            minW="auto"
            _hover={{ bg: 'transparent', transform: 'scale(1.1)' }}
          >
            <RepeatIcon 
              w={6} 
              h={6} 
              color="pepperoni.600"
            />
          </Button>
          <Button
            variant="outline"
            borderColor="pepperoni.600"
            color="pepperoni.600"
            onClick={handleFinish}
            px={8}
            py={6}
            fontSize={{ base: "xl", md: "2xl" }}
            fontFamily="heading"
            textTransform="uppercase"
            flex="1"
            borderWidth="3px"
            _hover={{ 
              bg: 'pepperoni.600',
              color: 'white',
              borderColor: 'pepperoni.600'
            }}
            transition="all 0.2s"
          >
            Done
          </Button>
        </Box>
      </Box>
      <Sparkle isVisible={sparkleVisible} />
    </Flex>
  );
}

export default App;