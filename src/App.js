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
import React, { useState, useRef, useEffect } from 'react';
import { data } from './data';
import PizzaVisualizer from './components/PizzaVisualizer';
import { motion, AnimatePresence } from 'framer-motion';
import { RepeatIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

function App() {
  const [size, setSize] = useState('medium');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const toast = useToast();
  const jazzAudioRef = useRef(new Audio('/sounds/jazz.mp3'));

  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile()) return;
    
    const audio = jazzAudioRef.current;
    audio.loop = true;
    audio.volume = 0.3;

    if (size === 'monster') {
      audio.play().catch(error => console.log('Error playing jazz:', error));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [size]);

  const allToppings = data.categories.toppings.items;

  const playSound = (soundName) => {
    if (isMobile()) return;
    const audio = new Audio(`/sounds/Low Volume -20dB/Buttons and Navigation/${soundName}`);
    audio.volume = 0.3;
    audio.play().catch(error => console.log('Error playing sound:', error));
  };

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev => {
      const exists = prev.find(t => t.title === topping.title);
      if (exists) {
        playSound('Collapse.m4a');
        return prev.filter(t => t.title !== topping.title);
      }
      playSound('Expand.m4a');
      return [...prev, topping];
    });
  };

  const handleSizeChange = (newSize) => {
    playSound('Button 5.m4a');
    if (newSize === 'monster') {
      playSound('Tab 3.m4a');
    }
    setSize(newSize);
  };

  const handleReset = () => {
    playSound('Button 4.m4a');
    setSize('medium');
    setSelectedToppings([]);
    setConfetti([]);
  };

  const handleFinish = () => {
    playSound('Tab 2.m4a');
    if (isDone) {
      setIsDone(false);
      setConfetti([]);
    } else {
      setIsDone(true);
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
    }
  };

  return (
    <Flex 
      direction={{ base: 'column', lg: 'row' }} 
      minH="100vh"
      overflow="hidden"
    >
      {/* Left Side - Fixed Pizza Section */}
      <Box 
        w={{ base: '100%', lg: '67%' }}
        bg={size === 'monster' ? "pepperoni.600" : "starlight.100"}
        position={{ base: 'relative', lg: 'fixed' }}
        h={{ base: 'min(60vh, fit-content)', lg: '100vh' }}
        left="0"
        top="0"
        transition="background-color 0.3s ease"
        overflowX="hidden"
        sx={{
          ...(size === 'monster' && {
            animation: 'redPulse 8s ease-in-out infinite',
            '@keyframes redPulse': {
              '0%': { backgroundColor: 'var(--chakra-colors-pepperoni-600)' },
              '33%': { backgroundColor: 'var(--chakra-colors-pepperoni-700)' },
              '66%': { backgroundColor: 'var(--chakra-colors-pepperoni-500)' },
              '100%': { backgroundColor: 'var(--chakra-colors-pepperoni-600)' }
            }
          })
        }}
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
            w={{ base: "16", lg: "32" }}
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
            height="100%"
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
            spacing={{ base: 4, lg: 4 }}
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
              onClick={() => handleSizeChange('small')}
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
              onClick={() => handleSizeChange('medium')}
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
              onClick={() => handleSizeChange('monster')}
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
        w={{ base: '100%', lg: '33%' }}
        ml={{ base: 0, lg: '67%' }}
        minH={{ base: '100vh', lg: 'auto' }}
        bg="white"
        position="relative"
        overflowX="hidden"
      >
        {/* Header */}
        <Box
          position="sticky"
          top={0}
          bg="white"
          zIndex={10}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Heading 
            color="pepperoni.900" 
            fontSize={{ base: "3xl", md: "4xl" }}
            py={8}
            pl={8}
          >
            Toppings
          </Heading>
        </Box>

        {/* Toppings List */}
        <Stack 
          spacing={0} 
          width="100%"
          pb={24}
          position="relative"
        >
          <Stack 
            spacing={2}
            width="100%"
            pt={4}
            pl={8}
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
          zIndex={9999}
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
            variant={isDone ? "solid" : "outline"}
            bg={isDone ? "pepperoni.600" : "transparent"}
            borderColor="pepperoni.600"
            color={isDone ? "white" : "pepperoni.600"}
            onClick={handleFinish}
            px={8}
            py={6}
            fontSize={{ base: "xl", md: "2xl" }}
            fontFamily="heading"
            textTransform="uppercase"
            flex="1"
            borderWidth="3px"
            _hover={{ 
              bg: isDone ? 'pepperoni.700' : 'pepperoni.600',
              color: 'white',
              borderColor: 'pepperoni.600'
            }}
            transition="all 0.2s"
          >
            {isDone ? "EAT PEPPERONI" : "Done"}
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
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              x: [`${piece.x}vw`, `${piece.x + piece.wobble}vw`, `${piece.x}vw`],
              y: `${piece.endY}vh`,
              rotate: [0, 360, 720],
              opacity: isDone ? 1 : [1, 0],
              scale: isDone ? 1 : [1, 0]
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
              },
              opacity: {
                duration: 0.3,
                ease: "easeOut"
              },
              scale: {
                duration: 0.3,
                ease: "easeOut"
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