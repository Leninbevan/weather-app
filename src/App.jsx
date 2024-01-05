import React from "react";
import "./App.css";
import { Home } from "./home";
import './index.css';
import { Weatherstatus } from "./weather_status";
import { useSelector } from "react-redux";

const App=()=>{
    
    const log=useSelector((state)=>state.log)

    return (
        <>
        {
            log===1||log===2?<Weatherstatus/>:<Home/>
        }
        </>
    )
}
export default App