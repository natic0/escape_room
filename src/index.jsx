
import { createRoot } from "react-dom/client";  
import { BrowserRouter } from "react-router-dom"; 
import { Canvas } from "@react-three/fiber"; 
import "./styles.css";  
import App from "./App"; 

const root = createRoot(document.getElementById("root"));  

root.render(
  <>
    <Canvas> 
      <App /> 
    </Canvas>
  </>
);
