import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Instruction from "./assests/introImage.png";
import Weather from "./assests/weather.png";
import { searching, weatherCradDetails, weatherDetails } from "./service/action";

export const Home = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const [theme,setTheme]=useState(false)
    const [location,setLocation]=useState("")
    const dispatch=useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
        return () => clearInterval(interval)
    }, []);


    const changeTheme = (e) => {
        if (e.target.checked) {
            setTheme(true)
        }
        else{
            setTheme(false)
        }
    }

    const searchLocation=(place)=>{
        
        axios({
            method:'GET',
            url:`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`
        }).then((response)=>{
            console.log(response.message);
            dispatch( searching(1))
           dispatch(weatherDetails(response.data))
           
          
        }).catch((error)=>{
            console.log(error);
            
        })

        axios({
            method:'GET',
            url:`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`
        }).then((response)=>{
            console.log(response);
           dispatch( searching(1))
           dispatch(weatherCradDetails(response.data))
          
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className={theme?"mainContainer":"white"}>
            <div className="d-flex p-2 align-items-center" style={{ justifyContent: "space-between" }}>
                <div className="align-items-center header" style={{ gap: "20px" }}>
                    <img src={Weather} alt="weather" style={{ width: "60px" }} />
                    <h3 className="fw-bold">Weather</h3>
                </div>
                <div>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={(e) => changeTheme(e)}
                            className="checkBox"
                        />
                    </Form>
                </div>
            </div>
            <div className="align-items-center m-5 inputGreeting" style={{ justifyContent: "space-between" }}>
                <div className="greeting fw-bold">{time < 12 ? "Good Morning" : "Good Afternon"}, {time}</div>
                <div className="inputDiv d-flex align-items-center p-2 " style={{ justifyContent: "space-between" }}>
                    <div><Form.Control type="text" placeholder="Search for location" className="searchBox border-0" value={location} onChange={(e)=>{setLocation(e.target.value)}} onKeyDown={(e)=>{e.key==="Enter" && searchLocation(location)}}/></div>
                    <div onClick={()=>{searchLocation(location)}} className="searchButton"><FaSearch /></div>
                </div>
            </div>
            <div className="text-center">
                <img src={Instruction} alt="intro" className="introImage"/>
                <div className="intro fw-bold">Welcome! Enter a location to get weather information.</div>
            </div>
        </div>
    )
}