import { motion } from 'framer-motion';
import { Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import { PIZZA_SIZES, PIZZA_DIMENSIONS, SCATTER_RADIUS } from '../constants';

const getRandomPosition = (maxRadius) => {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * maxRadius;
  
  return {
    x: 50 + r * Math.cos(angle),
    y: 50 + r * Math.sin(angle),
    rotate: Math.random() * 360
  };
};

function PizzaVisualizer({ size, toppings }) {
  const scale = PIZZA_DIMENSIONS[size].scale;
  const toppingPositionsRef = useRef({});
  
  toppings.forEach(topping => {
    if (!toppingPositionsRef.current[topping.title]) {
      const count = size === 'monster' ? 8 : size === 'medium' ? 6 : 4;
      toppingPositionsRef.current[topping.title] = Array.from(
        { length: count }, 
        () => getRandomPosition(SCATTER_RADIUS[size])
      );
    }
  });

  return (
    <Box 
      position="relative" 
      width={PIZZA_DIMENSIONS[size].size}
      height={PIZZA_DIMENSIONS[size].size}
      maxWidth={{ base: "90vw", md: "none" }}
      aspectRatio="1/1"
      mx="auto"
      sx={{
        '& > img': {
          objectFit: 'contain',
          aspectRatio: '1/1'
        }
      }}
    >
      {/* Base Pizza */}
      <Image
        as={motion.img}
        src="./images/pizza_7.png"
        alt="Pizza Base"
        width="100%"
        height="100%"
        objectFit="contain"
        position="absolute"
        animate={{ 
          rotate: [0, -1, 1, -0.5, 0],
          x: [0, -1, 1, -0.5, 0]
        }}
        transition={{ 
          rotate: {
            duration: 0.2,
            ease: "easeInOut"
          },
          x: {
            duration: 0.2,
            ease: "easeInOut"
          }
        }}
        sx={{
          transform: size === PIZZA_SIZES.MONSTER ? 
            `rotate(${Date.now() % 360}deg)` : 'none',
          animation: size === PIZZA_SIZES.MONSTER ? 'spin 30s linear infinite' : 'none',
          '@keyframes spin': {
            'from': { transform: 'rotate(0deg)' },
            'to': { transform: 'rotate(360deg)' }
          }
        }}
      />

      {/* Toppings Container */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        transform={`scale(${scale})`}
        borderRadius="50%"
        overflow="hidden"
        zIndex={1}
        sx={{
          animation: size === 'monster' ? 'spin 30s linear infinite' : 'none',
          '@keyframes spin': {
            'from': { transform: `scale(${scale}) rotate(0deg)` },
            'to': { transform: `scale(${scale}) rotate(360deg)` }
          }
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width={`${100/scale}%`}
          height={`${100/scale}%`}
          transform={`scale(${scale})`}
          transformOrigin="top left"
        >
          {toppings.map((topping) => 
            (toppingPositionsRef.current[topping.title] || []).map((pos, index) => (
              <Box
                key={`${topping.title}-${index}`}
                position="absolute"
                left={`${pos.x}%`}
                top={`${pos.y}%`}
                transform={`translate(-50%, -50%) rotate(${pos.rotate}deg)`}
              >
                <Image
                  src={`./images/${topping.filename}`}
                  alt={topping.title}
                  width="64px"
                  height="64px"
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PizzaVisualizer;