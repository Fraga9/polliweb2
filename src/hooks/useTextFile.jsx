import { useState, useEffect } from 'react';

const useTextFile = (filePath) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadTextFile = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('Error loading text file:', err);
        setContent(''); // Set to empty string if file can't be loaded
      }
    };

    loadTextFile();
  }, [filePath]);

  return content;
};

export default useTextFile;