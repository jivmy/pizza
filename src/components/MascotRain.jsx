import { Box, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MascotRain = ({ isActive }) => {
  const [mascots, setMascots] = useState([]);
  
  useEffect(() => {
    if (isActive) {
      const newMascots = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        duration: 1 + Math.random() * 1
      }));
      setMascots(newMascots);
    } else {
      setMascots([]);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          zIndex={1000}
        >
          {mascots.map((mascot) => (
            <motion.div
              key={mascot.id}
              initial={{ 
                y: -100,
                x: `${mascot.x}vw`,
                rotate: 0
              }}
              animate={{ 
                y: '100vh',
                rotate: mascot.rotation
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: mascot.duration,
                delay: mascot.delay,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                top: 0
              }}
            >
              <Image
                src="/images/mascot.png"
                alt="Peppy"
                w="12"
                h="12"
              />
            </motion.div>
          ))}
        </Box>
      )}
    </AnimatePresence>
  );
};

export default MascotRain; 