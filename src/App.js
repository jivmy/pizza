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
import { motion, AnimatePresence } from 'framer-motion';
import { RepeatIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

function App() {
  const [size, setSize] = useState('medium');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const toast = useToast();

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
    setConfetti([]);
  };

  const handleFinish = () => {
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -10,
      endY: 110,
      wobble: Math.random() * 40 - 20,
      delay: i * 0.1,
      duration: 2 + Math.random()
    }));
    setConfetti(newConfetti);
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
        h={{ base: 'fit-content', lg: '100vh' }}
        left="0"
        top="0"
        transition="background-color 0.3s ease"
      >
        <Stack 
          spacing={{ base: 4, lg: 8 }} 
          h={{ base: 'auto', lg: 'full' }}
          py={{ base: 2, lg: 8 }}
          px={{ base: 2, lg: 4 }}
          align="center"
        >
          <Image
            src={`./images/${size === 'monster' ? "logo_2.svg" : "logo.svg"}`}
            alt="Pepperoni Planet Logo"
            mx="auto"
            w={{ base: "24", lg: "32" }}
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
            px={{ base: 2, lg: 8 }}
            height={{ base: "auto", lg: "100%" }}
            py={{ base: 2, lg: 4 }}
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
          <Stack 
            spacing={{ base: 8, lg: 4 }} 
            position={{ base: "relative", lg: "fixed" }}
            bottom={{ base: "auto", lg: 8 }}
            left={{ base: "auto", lg: 8 }}
            zIndex={3}
            pb={{ base: 4, lg: 0 }}
            px={{ base: 2, lg: 0 }}
            direction={{ base: "row", lg: "column" }}
            justify={{ base: "center", lg: "flex-start" }}
            width={{ base: "100%", lg: "auto" }}
            mx="auto"
          >
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
          </Stack>
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
          position="relative"
        >
          <Box 
            pt={8}
            position="sticky"
            top={0}
            bg="white"
            zIndex={2}
            width="100%"
            borderBottom="1px"
            borderColor="gray.100"
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
          </Box>

          {/* Toppings List */}
          <Stack 
            spacing={2}
            width="fit-content"
            pt={4}
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
                    src={`./images/${topping.filename}`}
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
                    fontWeight={isSelected ? "bold  " : "thin"}
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

      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: `${piece.x}vw`,
              y: `${piece.startY}vh`,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              x: [`${piece.x}vw`, `${piece.x + piece.wobble}vw`, `${piece.x}vw`],
              y: `${piece.endY}vh`,
              rotate: [0, 360, 720],
              opacity: 1
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "linear",
              x: {
                duration: piece.duration,
                repeat: Infinity,
                ease: "easeInOut"
              },
              y: {
                duration: piece.duration,
                repeat: Infinity,
                ease: "linear"
              },
              rotate: {
                duration: piece.duration,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}
          >
            <Image
              src="/images/mascot.png"
              alt="confetti"
              w="8"
              h="8"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  );
}

export default App;