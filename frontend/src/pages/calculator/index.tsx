import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { SWATCHES } from "@/constants";
import { useAuth } from "@/contexts/authContext";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/firebase/firebase";
import { CalculatorIcon, Eraser } from "lucide-react";

// import {LazyBrush} from 'lazy-brush';

interface GeneratedResult {
  expression: string;
  answer: string;
}

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

export default function Calculator() {
  const { currentUser } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [eraserSize, setEraserSize] = useState(10); // Default eraser size

  const [dictOfVars, setDictOfVars] = useState({});
  const [result, setResult] = useState<GeneratedResult>();
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [tool, setTool] = useState("draw"); // 'draw' or 'erase'

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (currentUser) {
      const fetchUsername = async () => {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          console.log("Document data:", userDoc.data());
          setUsername(userDoc.data().username);
        }
      };
      fetchUsername();
    }
  }, [currentUser]);

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);

  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
  }, [result]);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round";
        ctx.lineWidth = 3;
      }
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderLatexToCanvas = (expression: string, answer: string) => {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
    setLatexExpression([...latexExpression, latex]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        const { offsetX, offsetY } = getOffset(e);
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      }
    }
  };
  // const draw = (e: React.MouseEvent | React.TouchEvent) => {
  //   if (!isDrawing) return;
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       ctx.strokeStyle = color;
  //       const { offsetX, offsetY } = getOffset(e);
  //       ctx.lineTo(offsetX, offsetY);
  //       ctx.stroke();
  //     }
  //   }
  // };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      if (tool === "draw") {
        ctx.strokeStyle = color;
        const { offsetX, offsetY } = getOffset(e);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      } else if (tool === "erase") {
        ctx.strokeStyle = "black"; // Assuming the canvas background is black
        ctx.lineWidth = 10; // Adjust the eraser size as needed
        ctx.lineWidth = eraserSize;
        const { offsetX, offsetY } = getOffset(e);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const getOffset = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const isTouch = (e as React.TouchEvent).touches;
    const offsetX = isTouch
      ? isTouch[0].clientX - rect.left
      : (e as React.MouseEvent).nativeEvent.offsetX;
    const offsetY = isTouch
      ? isTouch[0].clientY - rect.top
      : (e as React.MouseEvent).nativeEvent.offsetY;
    return { offsetX, offsetY };
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/calculate`,
        data: {
          image: canvas.toDataURL("image/png"),
          dict_of_vars: dictOfVars,
        },
      });

      const resp = await response.data;
      console.log("Response", resp);
      resp.data.forEach((data: Response) => {
        if (data.assign === true) {
          // dict_of_vars[resp.result] = resp.answer;
          setDictOfVars({
            ...dictOfVars,
            [data.expr]: data.result,
          });
        }
      });
      const ctx = canvas.getContext("2d");
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      let minX = canvas.width,
        minY = canvas.height,
        maxX = 0,
        maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 0) {
            // If pixel is not transparent
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      setLatexPosition({ x: centerX, y: centerY });
      resp.data.forEach((data: Response) => {
        setTimeout(() => {
          setResult({
            expression: data.expr,
            answer: data.result,
          });
        }, 1000);
      });
    }
  };
  const getBounds = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      return {
        left: 0,
        top: 10,
        right: rect.width - 170, // Adjust based on the size of the draggable element
        bottom: rect.height - 50, // Adjust based on the size of the draggable element
      };
    }
    return { left: 0, top: 0, right: 0, bottom: 0 };
  };
  return (
    <div className="bg-black overflow-hidden">
      <nav className="relative z-50">
        <div className="grid text-white p-5 items-center space-x-2">
          <div
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex cursor-pointer"
          >
            <CalculatorIcon className="h-8 w-8 text-white" />

            <span className="text-2xl ml-3 bg-gradient-to-r cursor-pointer from-red-600 to-purple-400 text-transparent bg-clip-text font-bold ">
              AI Calc
            </span>
          </div>
          <div className="text-white text-center relative  text-4xl z-20">
            Hello👋,{" "}
            {currentUser?.displayName ? currentUser.displayName : username}!
          </div>
        </div>
      </nav>
      <div className="relative text-center text-2xl text-white z-50">
        Draw or write something to start!
      </div>
      <div className="flex mx-5 md:mx-0 justify-around mt-5">
        <Button
          onClick={() => setReset(true)}
          className="z-20 rounded max-w-24 text-white"
          variant={"destructive"}
        >
          Reset
        </Button>

        <Group className="z-20 mx-5">
          {SWATCHES.map((swatch) => (
            <ColorSwatch
              key={swatch}
              color={swatch}
              onClick={() => {
                setColor(swatch);
                setTool("draw");
              }}
            />
          ))}
        </Group>
        <Button
          onClick={runRoute}
          className="z-20 rounded hover:bg-green-700  bg-green-400 text-black"
          style={{ backgroundColor: "rgb(74 222 128)" }}
          color="white"
        >
          Calculate
        </Button>
      </div>
      <div className="p-5 gap-2 flex justify-center ">
        <Eraser className="text-white" onClick={() => setTool("erase")} />

        <div className="flex items-center">
          <label htmlFor="eraserSize" className="text-white mr-2">
            Size:
          </label>
          <input
            type="range"
            id="eraserSize"
            min="1"
            max="50"
            value={eraserSize}
            onChange={(e: any) => {
              setEraserSize(e.target.value);
              setTool("erase");
            }}
            className="z-20"
          />
        </div>
      </div>
      <div className="overflow-hidden">
        {latexExpression &&
          latexExpression.map((latex, index) => (
            <Draggable
              key={index}
              defaultPosition={latexPosition}
              bounds={getBounds()}
              onStop={(_, data) => {
                setLatexPosition({ x: data.x, y: data.y });
              }}
            >
              <div className="absolute  p-2 z-50 text-white rounded shadow-md">
                <div className="latex-content absolute z-50">{latex}</div>
              </div>
            </Draggable>
          ))}

        <canvas
          ref={canvasRef}
          id="canvas"
          className="relative overflow-hidden bg-black top-0 left-0 w-full h-full border-2 border-white mt-4 touch-none select-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchEnd={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
        />
      </div>
    </div>
  );
}
