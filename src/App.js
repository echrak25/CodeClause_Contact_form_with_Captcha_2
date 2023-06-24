import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Contact from './contact';

function App() {
  return (
    <ChakraProvider>
      <Contact />
    </ChakraProvider>
  );
}

export default App;
