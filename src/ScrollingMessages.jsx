import React from 'react';
import { motion } from 'framer-motion';
import './ScrollingMessages.css';

const ScrollingMessages = ({ messages }) => {
  // Get random messages for each row
  const getRandomMessages = (arr, count) => {
    const selected = new Set();
    const result = [];
    
    while (result.length < count && result.length < arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!selected.has(randomIndex)) {
        selected.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }
    
    return result;
  };

  // Create rows with random messages
  const rows = Array.from({ length: 20 }, (_, i) => ({
    messages: getRandomMessages(messages, 500), // Get 20 random messages per row
    direction: i % 2 === 0 ? 1 : -1,
    speed: 25 + Math.random() * 20,
    offset: Math.random() * 100
  }));

  return (
    <motion.div 
      className="scrolling-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="scrolling-row"
          initial={{ x: row.direction > 0 ? -1000 : 1000 }}
          animate={{ x: row.direction > 0 ? 1000 : -1000 }}
          transition={{
            duration: row.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {row.messages.map((message, index) => (
            <span 
              key={`${i}-${index}`}
              className="message"
            >
              {message}
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ScrollingMessages;