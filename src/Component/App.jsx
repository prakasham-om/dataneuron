import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
function App() {
  const initialSizes = [
    { width: '30%', height: 200, x: 0, y: 0 },
    { width: '60%', height: 200, x: 400, y: 0 },
    { width: '100%', height: 200, x: 0, y: 300 }
  ];

  const [componentSizes, setComponentSizes] = useState(initialSizes);

  const handleResize = (index, _, __, delta) => {
    const newSizes = [...componentSizes];
    newSizes[index] = {
      ...newSizes[index],
      width: `${parseInt(newSizes[index].width) + delta.width}px`,
    };

    if (index === 0 && newSizes.length > 1) {
      newSizes[1] = {
        ...newSizes[1],
        width: `${parseInt(newSizes[1].width) - delta.width}px`,
      };
    } else if (index === 1 && newSizes.length > 2) {
      newSizes[0] = {
        ...newSizes[0],
        width: `${parseInt(newSizes[0].width) - delta.width}px`,
      };
      newSizes[2] = {
        ...newSizes[2],
        width: `${parseInt(newSizes[2].width) - delta.width}px`,
      };
    }

    setComponentSizes(newSizes);
  };

  const handleDragStop = (index, _, { x, y }) => {
    const newSizes = [...componentSizes];
    newSizes[index] = {
      ...newSizes[index],
      x,
      y,
    };

    // Adjust positions to prevent overlap
    if (index === 0 && newSizes.length > 1) {
      newSizes[1] = {
        ...newSizes[1],
        x: Math.max(x + parseInt(newSizes[0].width), newSizes[1].x),
      };
    } else if (index === 1 && newSizes.length > 2) {
      newSizes[0] = {
        ...newSizes[0],
        x: Math.min(x - parseInt(newSizes[0].width), newSizes[0].x),
      };
      newSizes[2] = {
        ...newSizes[2],
        x: Math.max(x + parseInt(newSizes[1].width), newSizes[2].x),
      };
    }

    setComponentSizes(newSizes);
  };

  const handleResizeStop = (index, _, __, ref) => {
    const newSizes = [...componentSizes];
    newSizes[index] = {
      ...newSizes[index],
      width: `${ref.style.width}px`,
    };

    setComponentSizes(newSizes);
  };

  return (
    <div className="m-auto p-10">
      {componentSizes.map((size, index) => (
        <Rnd
          key={index}
          size={{ width: size.width, height: size.height }}
          position={{ x: size.x, y: size.y }}
          onResize={(e, direction, ref, delta) => handleResize(index, e, ref, delta)}
          onDragStop={(e, d) => handleDragStop(index, e, d)}
          onResizeStop={(e, direction, ref, delta) => handleResizeStop(index, e, ref, delta)}
          enableResizing={{ top: true, right: true, bottom: true, left: true }}
          minWidth="100px" // Set minimum width to prevent shrinking too much
          style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}
        >
          <img
            src={`https://picsum.photos/200/300?random=${index}`}
            alt={`Component ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Rnd>
      ))}
    </div>
  );
}

export default App;
