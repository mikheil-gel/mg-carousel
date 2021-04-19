import React from 'react';
import Carousel from './components/Carousel.js';
import './app.css';

function App() {
  let cssStyles = {
    height: '512px',
    width: '768px',
    margin: 'auto',
  };
  return <Carousel cssStyles={cssStyles}></Carousel>;
}

export default App;
