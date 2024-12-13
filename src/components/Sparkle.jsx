import { Box, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Sparkle = ({ isVisible }) => {
  const [confetti, setConfetti] = useState([]);
  
  useEffect(() => {
    if (isVisible) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: 50 + Math.random() * 100 - 50, // Wider center spread (-50 to +50)
        y: 50 + Math.random() * 100 - 50, // Wider center spread (-50 to +50)
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
        duration: 0.7 + Math.random() * 0.5
      }));
      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          zIndex={9999}
        >
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                x: `${piece.x}vw`,
                y: `${piece.y}vh`,
                scale: 0,
                rotate: 0,
                opacity: 0
              }}
              animate={{ 
                x: [`${piece.x}vw`, `${piece.x + (Math.random() * 80 - 40)}vw`], // Wider spread
                y: [`${piece.y}vh`, `${piece.y + (Math.random() * 80 - 40)}vh`], // Wider spread
                scale: [0, piece.scale, piece.scale * 1.2, 0],
                rotate: [0, piece.rotation * 2], // More rotation
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                filter: 'saturate(150%)'
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

export default Sparkle; 