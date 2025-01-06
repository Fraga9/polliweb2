import React from 'react';
import { Heart, Music, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './FavoriteSong.css';

const FavoriteSong = () => {
  return (
    <motion.div 
      className="favorite-song-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="song-card">
        <motion.div 
          className="song-header"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Heart className="icon-heart" size={32} />
          <h2 className="title">Nuestra Canción del Año</h2>
          <div className="year-badge">
            <Music className="icon-music" size={16} />
            <span>2024</span>
          </div>
        </motion.div>

        <motion.div 
          className="album-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img src="./Camara.jpg" alt="Album Cover" />
          <div className="song-info">
            <h3>Cámara de faltas</h3>
            <p>Enjambre</p>
          </div>
        </motion.div>

        <motion.div 
          className="scrobbles-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="scrobble-count">
            <span className="listener">Héctor</span>
            <span className="count">53 reproducciones</span>
          </div>
          <div className="scrobble-count">
            <span className="listener">Pollito</span>
            <span className="count">33 reproducciones</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FavoriteSong;