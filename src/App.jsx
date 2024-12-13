import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import textContent from './assets/te_amos.txt?raw';
import ScrollingMessages from './ScrollingMessages';

// Componente de efecto de escritura de texto
const TypewriterEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    indexRef.current = 0;

    // Clear previous timer if text or speed changes
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, speed);

    return () => clearInterval(timerRef.current); 
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

// Componente de página de texto
const TextPage = ({ title, content }) => {
  return (
    <motion.div 
      className="page text-page"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <h1>{title}</h1>
      <p>
        <TypewriterEffect text={content} />
      </p>
    </motion.div>
  );
};

// Componente de página de imagen
const ImagePage = ({ imageUrl, alt }) => {
  return (
    <motion.div 
      className="page image-page"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <img src={imageUrl} alt={alt} />
    </motion.div>
  );
};

// Componente de página tipo carousel
const CarouselPage = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <motion.div 
      className="page carousel-page"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="carousel-container">
        <img 
          src={images[currentImage]} 
          alt={`Carousel image ${currentImage + 1}`} 
          className="carousel-image"
        />
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Componente principal de la aplicación
const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const messagesChat = textContent.split('\n').map((line) => line.trim()).filter(Boolean);
  console.log(messagesChat);
  const imagesPolliamor = [
    'src/images/polliamor.jpg', 
    'src/images/polliamor2.jpg', 
    'src/images/polliamor3.jpg', 
    'src/images/polliamor4.jpg', 
    'src/images/polliamor5.jpg'
  ];
  
  const pages = [
    { type: 'text', title: 'Bienvenido a la polliweb', content: 'Páágina para atesorar los recuerdos del polliamor' },
    { type: 'image', imageUrl: 'src/images/polliamor6.jpg', alt: 'Descripción de imagen' },
    { type: 'carousel', images: imagesPolliamor },
    { type: 'scrolling', messages: messagesChat},
    { type: 'text', title: '604 veces nos hemos dicho Te amo', content: 'Y  quiero que lo sigamos diciendo para siempre.' },
    { type: 'text', title: 'Gracias por ser mi polliamor', content: 'Tee amo'},
    { type: 'text', title: 'Quisiera hacerte una petición tal vez un poco egoísta', content: 'Seer el dueño de tu amor'},
    { type: 'text', title: '¿Aceptas?', content: '' },
    { type: 'text', title: 'Te amo', content: '<3333'},
  ];

  const handleSwipe = (direction) => {
    if (direction === 'right' && currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'left' && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {pages[currentPage].type === 'text' ? (
          <TextPage 
            key={`text-${currentPage}`}
            title={pages[currentPage].title} 
            content={pages[currentPage].content} 
          />
        ) : pages[currentPage].type === 'image' ? (
          <ImagePage 
            key={`image-${currentPage}`}
            imageUrl={pages[currentPage].imageUrl} 
            alt={pages[currentPage].alt} 
          />
        ) : pages[currentPage].type === 'carousel' ? (
          <CarouselPage 
            key={`carousel-${currentPage}`}
            images={pages[currentPage].images} 
          />
        ) : pages[currentPage].type === 'scrolling' ? (
          <ScrollingMessages
            key={`scrolling-${currentPage}`}
            messages={pages[currentPage].messages}
          />
        ) : null}
      </AnimatePresence>
      <div 
        className="swipe-area left" 
        onTouchStart={() => handleSwipe('left')}
      />
      <div 
        className="swipe-area right" 
        onTouchStart={() => handleSwipe('right')}
      />
    </div>
  );
};

export default App;