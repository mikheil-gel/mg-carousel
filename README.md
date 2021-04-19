# mg-carousel

react carousel component

**[demo](https://mikheil-gel.github.io/mg-carousel-demo/)**

## Install

Download or clone repository and run:

```bash
npm i
```

## Usage

HTML elements should be passed as <Carosuel> component's children;
Use 'cssStyles' property to style component.

```jsx
import React from 'react';
import Carousel from './components/Carousel.js';
import './app.css';

function App() {

  let cssStyles = {
    height: '512px',
    width: '768px',
  };

  return (
    <Carousel cssStyles={cssStyles}>
        <h1>first slide </h1>
        <h1>second slide </h1>
        <h1>third slide </h1>
    </Carousel>;
  )
}

export default App;
```

## Development

run application:

```bash
npm start
```

build:

```bash
npm run build
```
