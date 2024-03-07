import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function App() {
  const initialSizes = [
    { width: '10%', height: 200, x: 0, y: 0 },
    { width: '50%', height: 200, x: 400, y: 0 },
    { width: '80%', height: 200, x: 0, y: 350 }
  ];

  const [componentSizes, setComponentSizes] = useState(initialSizes);

  const handleResize = (index, _, __, delta, position) => {
    const newSizes = [...componentSizes];
    newSizes[index] = {
      ...newSizes[index],
      width: `${parseInt(newSizes[index].width) + delta.width}px`
    };

    // Calculate the total width of all components except the one being resized
    let totalWidth = 0;
    for (let i = 0; i < componentSizes.length; i++) {
      if (i !== index) {
        totalWidth += parseInt(newSizes[i].width);
      }
    }

    // Distribute the delta width among all components except the one being resized
    const deltaWidthPerComponent = delta.width / totalWidth;
    for (let i = 0; i < componentSizes.length; i++) {
      if (i !== index) {
        newSizes[i] = {
          ...newSizes[i],
          width: `${parseInt(newSizes[i].width) - parseInt(newSizes[i].width) * deltaWidthPerComponent}px`
        };
      }
    }

    setComponentSizes(newSizes);
  };

  return (
    <div className="m-auto p-10">
      {componentSizes.map((size, index) => (
        <Rnd
          key={index}
          size={{ width: size.width, height: size.height }}
          position={{ x: size.x, y: size.y }}
          onResize={(e, direction, ref, delta, position) => handleResize(index, e, ref, delta, position)}
          enableResizing={{ top: true, right: true, bottom: true, left: true }}
          style={{ border: '1px solid black', padding: '10rem' }}
        >
          Component {index + 1}
        </Rnd>
      ))}
    </div>
  );
}

export default App;
