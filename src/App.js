import React from "react";
import { motion } from "framer-motion";
import { Button } from './Components/ui/Button';
import { Card, CardContent } from './Components/ui/Card';
import Home from "./Components/Home"; 
import GetQuote from "./Components/GetQoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin_Pannel from "./Components/Admin_Pannel";
import GetBookedQoutes from "./Components/GetBookedQoutes";
import AdminLogin from "./Components/AdminLogin";

// export default function H() {
//   return (
//     <div className="w-full">
//       <Home/>
//       <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/get-quote" element={<GetQuote />} />
//       </Routes>
//     </Router>
//     </div>
//   );
// }



function App() {
  return (
   <div className="w-full">

    
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/getAllCargo" element={< GetBookedQoutes/>} />
      </Routes>
    </div>
  );
}

export default App;
