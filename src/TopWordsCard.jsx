import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import "./TopWordsCard.css";
import wordData from "./assets/wordFrequencies.json";

const TopWordsCard = ({ user }) => {
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Actualiza la altura dinámica del viewport
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
      document.documentElement.style.setProperty(
        "--dynamic-height",
        `${window.innerHeight}px`
      );
    };

    // Escucha cambios en el tamaño de la ventana
    window.addEventListener("resize", updateHeight);
    updateHeight();

    // Limpia el listener al desmontar el componente
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    // Carga las palabras según el usuario
    if (wordData[user]) {
      setWordFrequencies(wordData[user].slice(0, 5)); // Muestra solo el top 5
    } else {
      setWordFrequencies([]);
    }
  }, [user]);

  return (
    <motion.div
      className="top-words-container"
      style={{ minHeight: `var(--dynamic-height)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="words-card">
        <motion.div
          className="words-header"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MessageSquare className="icon-message" size={32} />
          <h2 className="title">Top 5 Palabras Más Usadas</h2>
          <div className="user-badge">
            <span>{user}</span>
          </div>
        </motion.div>

        <div className="words-list">
          {wordFrequencies.length > 0 ? (
            wordFrequencies.map((item, index) => (
              <motion.div
                key={item.word}
                className="word-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="rank">#{index + 1}</span>
                <span className="word">{item.word}</span>
                <span className="frequency">{item.frequency}</span>
              </motion.div>
            ))
          ) : (
            <div className="no-data">No hay datos para este usuario</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TopWordsCard;
