import React from 'react';
import Carousel from './components/Carousel.js';
import './app.css';

function App() {
  let cssStyles = {
    height: '512px',
    width: '768px',
    margin: 'auto',
  };
  let slideData = [
    { className: 'item-1', headingText: '1' },
    { className: 'item-2', headingText: '2' },
    { className: 'item-3', headingText: '3' },
    { className: 'item-4', headingText: '4' },
    { className: 'item-5', headingText: '5' },
  ];

  return (
    <div className='good'>
      <Carousel cssStyles={cssStyles}>
        {slideData.map((sl, id) => {
          return (
            <div className={`slide-item ${sl.className}`} key={id}>
              <h1>{sl.headingText}</h1>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default App;
