import React from 'react';
import { motion } from 'framer-motion';
import './ScrollingMessages.css';

const ScrollingMessages = ({ messages: messagesData }) => {
  console.log("Gola");
  console.log(messagesData);

  // Extraer solo los mensajes del JSON
  const messages = messagesData.messages.map(msg => msg.message);

  // Obtener mensajes aleatorios únicos para cada fila
  const getUniqueRandomMessages = (arr, count) => {
    // Crear un conjunto para evitar duplicados
    const uniqueMessages = new Set(arr);
    const uniqueArray = [...uniqueMessages];
    
    const selected = [];
    
    while (selected.length < count && uniqueArray.length > 0) {
      // Seleccionar un índice aleatorio
      const randomIndex = Math.floor(Math.random() * uniqueArray.length);
      
      // Añadir el mensaje y removerlo para evitar repeticiones
      selected.push(uniqueArray[randomIndex]);
      uniqueArray.splice(randomIndex, 1);
    }
    
    // Si no hay suficientes mensajes únicos, rellenar con duplicados
    while (selected.length < count) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      selected.push(arr[randomIndex]);
    }
    
    return selected;
  };

  // Crear filas con mensajes aleatorios y únicos
  const rows = Array.from({ length: 20 }, (_, i) => ({
    messages: getUniqueRandomMessages(messages, 30), // 50 mensajes únicos por fila
    direction: i % 2 === 0 ? 1 : -1,
    speed: 15 + Math.random() * 25,
    offset: Math.random() * 100 + Math.random() * 10
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
        style={{ '--index': i }}
        initial={{ x: row.direction > 0 ? '-100%' : '100%' }}
        animate={{ x: row.direction > 0 ? '100%' : '-100%' }}
        transition={{
          duration: row.speed,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0
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