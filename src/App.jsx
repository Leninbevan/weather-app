import React from "react";
import { Home } from "./home";
import { Weatherstatus } from "./weather_status";

const App=()=>{
    let log=false
    return (
        <>
        {
            log?<Home/>:<Weatherstatus/>
        }
        </>
    )
}
export default App