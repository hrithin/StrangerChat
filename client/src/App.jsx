
import { Route, Routes } from "react-router-dom";
import { Landing, Login, Signup ,Home, OTPPage } from "./pages";
import Layout from "./layouts/Layout";



function App() {
  return(
    <>
     <Routes>
      
      {/* Routes WITHOUT Layout */}
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/verification" element={<OTPPage/>} />

      {/* Routes WITH Layouts inside */}
      <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home/>} />
      </Route>
    </Routes>
   
    </>
   
  )
}

export default App;
