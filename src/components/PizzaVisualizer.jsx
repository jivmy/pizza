import { motion } from 'framer-motion';
import { Box, Image } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';
import { PIZZA_SIZES, PIZZA_DIMENSIONS, SCATTER_RADIUS } from '../constants';

const getRandomPosition = (maxRadius, isMobile) => {
  const angle = Math.random() * Math.PI * 2;
  const adjustedRadius = isMobile ? maxRadius * 0.6 : maxRadius;
  const r = Math.sqrt(Math.random()) * adjustedRadius;
  
  return {
    x: 50 + (r * Math.cos(angle)),
    y: 50 + (r * Math.sin(angle)),
    rotate: Math.random() * 360
  };
};

function PizzaVisualizer({ size, toppings, isPepperoniStopped }) {
  const scale = PIZZA_DIMENSIONS[size].scale;
  const toppingPositionsRef = useRef({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Reset topping positions when mobile state changes or size changes
    toppingPositionsRef.current = {};
  }, [isMobile, size]);

  toppings.forEach(topping => {
    if (!toppingPositionsRef.current[topping.title]) {
      const count = size === 'monster' ? 8 : size === 'medium' ? 6 : 4;
      toppingPositionsRef.current[topping.title] = Array.from(
        { length: count }, 
        () => getRandomPosition(SCATTER_RADIUS[size], isMobile)
      );
    }
  });

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      width={PIZZA_DIMENSIONS[size].size}
      height={PIZZA_DIMENSIONS[size].size}
      maxWidth={{ 
        base: size === 'monster' ? "75vw" : size === 'medium' ? "45vw" : "35vw", 
        md: "none" 
      }}
      aspectRatio="1/1"
      mx="auto"
      as={motion.div}
      initial={false}
      animate={{ 
        opacity: 1
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      sx={{
        '& > img': {
          objectFit: 'contain',
          aspectRatio: '1/1'
        }
      }}
    >
      {/* Base Pizza */}
      <Image
        key={size}
        as={motion.img}
        src="./images/pizza_7.png"
        alt="Pizza Base"
        width="100%"
        height="100%"
        objectFit="contain"
        position="absolute"
        sx={{
          animation: size === PIZZA_SIZES.MONSTER && !isPepperoniStopped ? 'spin 30s linear infinite' : 'none',
          '@keyframes spin': {
            'from': { transform: 'rotate(0deg)' },
            'to': { transform: 'rotate(360deg)' }
          }
        }}
      />

      {/* Toppings Container */}
      <Box
        key={`toppings-${size}`}
        as={motion.div}
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
          animation: size === 'monster' && !isPepperoniStopped ? 'spin 30s linear infinite' : 'none',
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