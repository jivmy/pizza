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
        <Box>
          {confetti.map((piece) => (
            <motion.div key={piece.id}>
              <Image
                src={`${process.env.PUBLIC_URL}/images/mascot.png`}
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