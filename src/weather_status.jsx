import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";
import Temperature from "./assests/temparature.png";
import Weather from "./assests/weather.png";
import Haze from "./assests/hazeimg.png";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import { BiUpArrowAlt } from "react-icons/bi";
import { GiMultiDirections } from "react-icons/gi";
import Cloud from "./assests/cloud.png";
import { useDispatch, useSelector } from "react-redux";
import { searching, weatherCradDetails, weatherDetails } from "./service/action";
import axios from "axios";
import { MdNorth } from "react-icons/md";
import { MdOutlineSouthEast } from "react-icons/md";
import { MdEast } from "react-icons/md";
import { MdSouthEast } from "react-icons/md";
import { MdOutlineSouth } from "react-icons/md";
import { MdSouthWest } from "react-icons/md";
import { MdWest } from "react-icons/md";
import { MdNorthWest } from "react-icons/md";
import Errorlogo from "./assests/wrong location-gif.gif"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";

const Weatherstatus = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const [theme, setTheme] = useState(false)
    const weatherDetail = useSelector((state) => state.weatherDetails)
    const deg = useSelector((state) => state.weatherDetails.wind.deg)
    const cardDetails = useSelector((state) => state.cardDetails)
    const [errorloc, setErrorloc] = useState()

    const [location, setLocation] = useState()
    const dispatch = useDispatch()
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [color, setColor] = useState()

    const directions = [['North', <MdNorth />], ['North East', <MdOutlineSouthEast />], ['East', <MdEast />], ['South East', <MdSouthEast />], ['South', <MdOutlineSouth />], ['South West', <MdSouthWest />], ['West', <MdWest />], ['North West', <MdNorthWest />]];
    const index = Math.round((deg % 360) / 45);

    const position = { lat: weatherDetail.coord.lat, lng: weatherDetail.coord.lon };
    const [open, setOpen] = useState(false);

    console.log("weatherDetail", weatherDetail);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
        return () => clearInterval(interval)
    }, []);

    const searchLocation = (place) => {
        axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`
        }).then((response) => {
            setErrorloc(0)
            dispatch(searching(2))
            dispatch(weatherDetails(response.data))
        }).catch((error) => {
            console.log(error);
            setErrorloc(1)
        })

        axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`
        }).then((response) => {
            setErrorloc(0)
            dispatch(searching(2))
            dispatch(weatherCradDetails(response.data.list))

        }).catch((error) => {
            console.log(error);
            setErrorloc(1)
        })
    }


    const changeTheme = (e) => {
        if (e.target.checked) {
            setTheme(true)
        }
        else {
            setTheme(false)
        }
    }

    const calculateSuntime = (time) => {
        const unix = time
        let date = new Date(unix * 1000).toTimeString().split(" ");
        return date[0]
    }

    const mapKey = "AIzaSyDmCAnXJg525Oi2pLmp6X1aIRvgoUFs3Fo"
    const mapId = "e47e3dc438967ab5"

    const sunrise = calculateSuntime(weatherDetail.sys.sunrise)
    const sunset = calculateSuntime(weatherDetail.sys.sunset)

    return (
        <div className={theme ? "mainContainer" : "white"}>
            <div className="d-flex ms-5 me-5 pt-3 align-items-center timeTheme" style={{ justifyContent: "space-between" }}>
                <div className="header align-items-center" style={{ gap: "20px" }}>
                    <img src={Weather} alt="weather" style={{ width: "60px" }} />
                    <h3 className="fw-bold">Weather</h3>
                </div>
                <div className="gap-5 text-center themeColor">
                    <div>
                        <select name="cars" id="cars" className="dropDown" onChange={(e) => setColor(e.target.value)}>
                            <option value="color" className="optionsky">skyblue</option>
                            <option value="red" className="optionred">red</option>
                            <option value="pink" className="optionpink">pink</option>
                            <option value="green" className="optiongreen">green</option>
                            <option value="blue" className="optionblue">blue</option>
                        </select>
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
            </div>
            <div className="align-items-center mb-5 ms-5 me-5 inputGreeting" style={{ justifyContent: "space-between" }}>
                <div className="greeting fw-bold">{time < 12 ? "Good Morning" : "Good Afternon"}, {time}</div>
                <div className="inputDiv d-flex align-items-center p-2 " style={{ justifyContent: "space-between" }}>
                    <div><Form.Control type="text" placeholder="Search for location" className="searchBox border-0" value={location} onChange={(e) => { setLocation(e.target.value) }} onKeyDown={(e) => { e.key === "Enter" && searchLocation(location) }} /></div>
                    <div onClick={() => { searchLocation(location) }} className="searchButton"><FaSearch /></div>
                </div>
            </div>{
                errorloc !== 1 ? <div>
                    <div className="temparatureLoc align-items-center" style={{ justifyContent: "space-evenly" }}>
                        <div>
                            <div className="mb-3 location"><span><IoLocationOutline className={`fs-2 ${color} color`} /></span><span className="fs-4 ms-2">{weatherDetail.name} / {weatherDetail.sys.country}</span></div>
                            <div className="mb-3 date"><span><IoCalendarNumberOutline className={`fs-4 ${color} color`} /></span><span className="fs-6 ms-2">{dayList[new Date().getDay()]}, {new Date().getDate()} {monthList[new Date().getMonth()]} {new Date().getFullYear()}</span></div>
                            <div className="d-flex temparatureImage">
                                <div>
                                    <p className="temparature">{weatherDetail.main.temp}</p>
                                    <p>Feels like: {weatherDetail.main.feels_like}</p>
                                </div>
                                <div>
                                    <img src={Temperature} alt="temparture" className="temparatureLogo" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div><img src={Haze} alt="hazeimg" className="hazeimg" /></div>
                            <div className={`text-center fs-3 fw-bold ${color} color`}>{weatherDetail.weather[0].main}</div>
                        </div>

                        <div className="map">
                            <APIProvider apiKey={mapKey}>
                                <Map zoom={9} center={position} mapId={mapId}>
                                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                                        <Pin
                                            background={"grey"}
                                            borderColor={"green"}
                                            glyphColor={"purple"}
                                        />
                                    </AdvancedMarker>

                                    {open && (
                                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                            <p>You have searched {weatherDetail.name}!</p>
                                        </InfoWindow>
                                    )}
                                </Map>
                            </APIProvider>
                        </div>

                        <div className="allData">
                            <div className="fs-4 sunrise"><span><FiSunrise className={`color ${color}`} /></span><span className="ms-3">Sunrise: {sunrise} AM</span></div>
                            <div className="fs-4 sunset"><span><FiSunset className={`color ${color}`} /></span><span className="ms-3">Sunset: {sunset} PM</span></div>
                            <div className="fs-4 humidity"><span><WiHumidity className={`color ${color}`} /></span><span className="ms-3">Humidity: {weatherDetail.main.humidity}%</span></div>
                            <div className="fs-4 wind"><span><GiWindsock className={`color ${color}`} /></span><span className="ms-3">Wind Speed: {weatherDetail.wind.speed}k/hr</span></div>
                            <div className="fs-4 pressure"><span><BiUpArrowAlt className={`color ${color}`} /></span><span className="ms-3">Pressure: {weatherDetail.main.pressure}mb</span></div>
                            <div className="fs-4 direction"><span><GiMultiDirections className={`color ${color}`} /></span><span className="ms-3">Directions: {directions[index]}</span></div>
                        </div>
                    </div>
                    <div className="text-center mt-4 fs-2">Next 24 hours Forecast</div>
                    <div className="cardDiv row row-cols-8">
                        {
                            // eslint-disable-next-line array-callback-return
                            cardDetails?.map((item, index) => {
                                if (index < 8) {
                                    return (
                                        <div className="p-2 outerTempDiv col">
                                            <div className="tempcard text-center p-2" key={index}>
                                                <div className={`cloudDiv text-center ${color}`}><img src={Cloud} alt="cloud" className={`cloud ${color}`} /></div>
                                                <div className="cloudName mb-3">{item.weather[0].description.toUpperCase()}</div>
                                                <div className={`mb-2 fs-5 ${color} color`}>{item.main.temp}&deg;C</div>
                                                <div>{item.dt_txt.split(" ")[0].replaceAll("-", "/")},</div>
                                                <div>{item.dt_txt.split(" ")[1]}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div> : <div className="errorDiv">
                    <img src={Errorlogo} alt="404 error" />
                    <p className="errorMsg">Kindly check your entered location..!</p>
                </div>
            }


        </div>
    )
}
export default Weatherstatus
