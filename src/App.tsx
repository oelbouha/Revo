 
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/NotFound";
import { P } from "node_modules/framer-motion/dist/types.d-Bq-Qm38R";
import ProjectDetail from "./pages/projectDetail";
import { Layout } from "./pages/Layout";
import { Value } from "@radix-ui/react-select";
import {Homepage} from "./pages/homepage/Home";



export const router = createBrowserRouter([
    { path: "/", Component: Layout ,
      children: [
        { index: true, element: <Homepage /> },
        { path: 'project', element: <ProjectDetail /> },
         { path: "*", element: <Homepage /> }, 
      ],}
  ]);
  

const App = () => (
     <RouterProvider router={router}/>
);

export default App;

