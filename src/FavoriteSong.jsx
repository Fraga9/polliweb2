import React from 'react';
import { Heart, Music } from 'lucide-react';
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
          className="song-embed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <iframe
            src="https://open.spotify.com/embed/track/6O3D5ai8UmEHwyicBq07pk?utm_source=generator&theme=0"
            width="100%"
            height="281.5"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </motion.div>

        <motion.div 
          className="song-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Si una canción atesorara el amor que nos tenemos</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FavoriteSong;