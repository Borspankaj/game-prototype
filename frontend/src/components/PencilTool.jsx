import rough from "roughjs/bundled/rough.esm";
import { useEffect, useState, useRef, useCallback } from "react";
import throttle from 'lodash/throttle'; // lodash throttle for event handling optimization

const midPointBtw = (p1, p2) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
};

export const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (x1 < x2 || (x1 === x2 && y1 < y2)) {
    return { x1, y1, x2, y2 };
  } else {
    return { x1: x2, y1: y2, x2: x1, y2: y1 };
  }
};

function App({ client, username }) {
  const msg = client.lastJsonMessage;
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [path, setPath] = useState([]);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.save();

    const drawPath = () => {
      path.forEach((stroke) => {
        context.beginPath();
        stroke.forEach((point, i) => {
          var midPoint = midPointBtw(point.clientX, point.clientY);
          context.quadraticCurveTo(point.clientX, point.clientY, midPoint.x, midPoint.y);
          context.lineTo(point.clientX, point.clientY);
          context.stroke();
        });
        context.closePath();
        context.save();
      });
    };

    const roughCanvas = rough.canvas(canvas);
    if (path !== undefined) drawPath();

    elements.forEach(({ roughEle }) => {
      context.globalAlpha = "1";
      roughCanvas.draw(roughEle);
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements, path]);

  useEffect(() => {
    client.sendJsonMessage({ message: { clientX: 0, clientY: 0 }, type: 'points', event: 'initial', action: 'none', isdrawing: false });
  }, []);

  useEffect(() => {
    if (msg) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (msg.event === 'mousedown') {
        setAction("sketching");
        setIsDrawing(true);
        const { clientX, clientY } = msg.points;
        const newEle = { clientX, clientY };
        setPoints((state) => [...state, newEle]);
        context.lineCap = 5;
        context.moveTo(clientX, clientY);
        context.beginPath();
      }

      if (msg.event === 'mousemove') {
        if (action === "sketching" && isDrawing) {
          const { clientX, clientY } = msg.points;
          const newEle = { clientX, clientY };
          setPoints((state) => [...state, newEle]);
          var midPoint = midPointBtw(clientX, clientY);
          context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
          context.lineTo(clientX, clientY);
          context.stroke();
        }
      }

      if (msg.event === 'mouseup') {
        context.closePath();
        const element = points;
        setPoints([]);
        setPath((prevState) => [...prevState, element]);
        setIsDrawing(false);
      }
    }
  }, [msg]);

  const updateElement = (index, x1, y1, x2, y2, toolType) => {
    const updatedElement = createElement(index, x1, y1, x2, y2, toolType);
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    client.sendJsonMessage({ message: { clientX: clientX, clientY: clientY }, type: 'points', event: 'mousedown', action: 'sketching', isdrawing: true });
  };

  const handleMouseMove = useCallback(
    throttle((e) => {
      const { clientX, clientY } = e;
      client.sendJsonMessage({ message: { clientX: clientX, clientY: clientY }, type: 'points', event: 'mousemove', action: 'sketching', isdrawing: true });
    }, 50), []
  );

  const handleMouseUp = (e) => {
    const { clientX, clientY } = e;
    client.sendJsonMessage({ message: { clientX: clientX, clientY: clientY }, type: 'points', event: 'mouseup', action: 'initial', isdrawing: false });
  };

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        className="App"
        width={400}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
    </div>
  );
}

export default App;








// import rough from "roughjs/bundled/rough.esm";
// import { useEffect, useState } from "react";



// const midPointBtw = (p1, p2) => {

//   return {
//     x: p1.x + (p2.x - p1.x) / 2,
//     y: p1.y + (p2.y - p1.y) / 2,
//   };
// };

// export const adjustElementCoordinates = (element) => {
//   const { type, x1, y1, x2, y2 } = element;
//   if (x1 < x2 || (x1 === x2 && y1 < y2)) {
//     return { x1, y1, x2, y2 };
//   } else {
//     return { x1: x2, y1: y2, x2: x1, y2: y1 };
//   }
// };

// function App(
//   { client, username }
// ) {
//   const msg = client.lastJsonMessage

//   const [elements, setElements] = useState([]);
//   const [isDrawing, setIsDrawing] = useState(false);

//   const [points, setPoints] = useState([]);
//   const [path, setPath] = useState([]);

//   const [action, setAction] = useState("none");
//   const [toolType, setToolType] = useState("pencil");
//   const [selectedElement, setSelectedElement] = useState(null);

//   useEffect(() => {
//     const canvas = document.getElementById("canvas");
//     const context = canvas.getContext("2d");
//     context.lineCap = "round";
//     context.lineJoin = "round";

//     context.save();

//     const drawpath = () => {
//       path.forEach((stroke, index) => {
//         context.beginPath();

//         stroke.forEach((point, i) => {
//           var midPoint = midPointBtw(point.clientX, point.clientY);

//           context.quadraticCurveTo(
//             point.clientX,
//             point.clientY,
//             midPoint.x,
//             midPoint.y
//           );
//           context.lineTo(point.clientX, point.clientY);
//           context.stroke();
//         });
//         context.closePath();
//         context.save();
//       });
//     };

//     const roughCanvas = rough.canvas(canvas);

//     if (path !== undefined) drawpath();

//     elements.forEach(({ roughEle }) => {
//       context.globalAlpha = "1";
//       roughCanvas.draw(roughEle);
//     });

//     return () => {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//     };
//   }, [elements, path]);



//   useEffect(() => {

//     client.sendJsonMessage({ message: { clientX: 0, clientY: 0 }, type: 'points', event: 'initial', action: 'none', isdrawing: false })
//     // console.log(msg)

//     // setPath((prevState) => [...prevState, msg.points]);
//   }, [])

//   useEffect(() => {

//     if (msg ) {
//       if (msg.event === 'mousedown') {

//         const canvas = document.getElementById("canvas");
//         const context = canvas.getContext("2d");

//         const id = elements.length;
//         setAction("sketching");
//         setIsDrawing(true);
//         console.log("sketching")
//         const { clientX, clientY } = msg.points;
//         const transparency = "1.0";
//         const newEle = {
//           clientX,
//           clientY,
//         };
//         setPoints((state) => [...state, newEle]);

//         context.lineCap = 5;
//         context.moveTo(clientX, clientY);
//         context.beginPath();
//       }
//       if (msg.event === 'mousemove') {
//         const canvas = document.getElementById("canvas");
//         const context = canvas.getContext("2d");

//         if (action === "sketching") {
//           if (!isDrawing) return;

//           const { clientX, clientY } = msg.points;
//           const transparency = points[points.length - 1].transparency;
//           const newEle = { clientX, clientY, transparency };
//           setPoints((state) => [...state, newEle]);
//           var midPoint = midPointBtw(clientX, clientY);
//           context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
//           context.lineTo(clientX, clientY);
//           context.stroke();
//         }
//       }
//       if (msg.event === 'mouseup') {
//         const canvas = document.getElementById("canvas");
//         const context = canvas.getContext("2d");
//         context.closePath();
//         const element = points;
//         setPoints([]);
//         setPath((prevState) => [...prevState, element]); //tuple
//         setIsDrawing(false);
//     }
//   }
//   }, [msg])






//   const updateElement = (index, x1, y1, x2, y2, toolType) => {
//     const updatedElement = createElement(index, x1, y1, x2, y2, toolType);
//     const elementsCopy = [...elements];
//     elementsCopy[index] = updatedElement;
//     setElements(elementsCopy);
//   };

//   const handleMouseDown = (e) => {
//     const { clientX, clientY } = e;
//     // console.log(e.clientX,e.clientY)
//     client.sendJsonMessage({ message: { clientX: clientX, clientY: clientY }, type: 'points', event: 'mousedown', action: 'sketching', isdrawing: true })
//     // const canvas = document.getElementById("canvas");
//     // const context = canvas.getContext("2d");

//     // const id = elements.length;
//     // if (toolType === "pencil") {
//     //   setAction("sketching");
//     //   setIsDrawing(true);
//     //   console.log("sketching")

//     //   const transparency = "1.0";
//     //   const newEle = {
//     //     clientX,
//     //     clientY,
//     //     transparency,
//     //   };
//     //   setPoints((state) => [...state, newEle]);

//     //   context.lineCap = 5;
//     //   context.moveTo(clientX, clientY);
//     //   context.beginPath();
//     // } 
//   };

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     client.sendJsonMessage({ message: { clientX: clientX, clientY: clientY }, type: 'points', event: 'mousemove', action: 'sketching', isdrawing: true })

//     // client.sendJsonMessage({message:{...e},type:'points',event:'mousemove',action:'sketching'})

//     // const canvas = document.getElementById("canvas");
//     // const context = canvas.getContext("2d");

//     // if (action === "sketching") {
//     //   if (!isDrawing) return;

//     //   const transparency = points[points.length - 1].transparency;
//     //   const newEle = { clientX, clientY, transparency };
//     //   client.sendJsonMessage({message:newEle,type:'points'})
//     //   setPoints((state) => [...state, newEle]);
//     //   var midPoint = midPointBtw(clientX, clientY);
//     //   context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
//     //   context.lineTo(clientX, clientY);
//     //   context.stroke();
//     // } 
//   };
//   const handleMouseUp = (e) => {
//     const { clientX, clientY } = e;
//     client.sendJsonMessage({ message: { clientX: 0, clientY: 0 }, type: 'points', event: 'mouseup', action: 'initial', isdrawing: false })

//     // const canvas = document.getElementById("canvas");
//     // const context = canvas.getContext("2d");
//     // context.closePath();
//     // const element = points;
//     // setPoints([]);
//     // setPath((prevState) => [...prevState, element]); //tuple
//     // setIsDrawing(false);
//   };
//   return (
//     <div>
//       <canvas
//         id="canvas"
//         className="App"
//         width={400}
//         height={300}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         Canvas
//       </canvas>
//     </div>
//   );
// }

// export default App;
