import React, { Suspense, lazy } from "react";
import "./App.css";
import { Home } from "./home";
import './index.css';
import { useSelector } from "react-redux";

const Weatherstatus = lazy(() => import('./weather_status.jsx'));

const App = () => {

    const log = useSelector((state) => state.log)

    return (
        <>
          
            {
                log === 1 || log === 2 ? <Suspense fallback={  <div class="loader">
                <div class="justify-content-center jimu-primary-loading"></div>
            </div>}><Weatherstatus /> </Suspense> : <Home />
            }
        </>
    )
}
export default App