import "./App.css";
import TopButtons from "./components/TopButtons";

import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dev from '../src/components/dev.png';
import { Youtube, Linkedin, Github } from "react-bootstrap-icons";

function App() {
  const [query, setQuery] = useState({ q: "colombo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      await getFormattedWeatherData({ ...query, units }).then((data) => {

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className="main">

    <span className="navbar-text justify-center">
            <h1 className='text-20xl mr-40 text-center text-white'>Francis Silva</h1>
            <a className="nav-link" href="/">
              <h1 className='text-20xl justify-center ml-40 text-white'>LogOut</h1>
            </a>
              <div className="social-icon">
                <a href="https://www.youtube.com/channel/UCzWYas0cWXTT1YFgZQhLUyQ"><Youtube className="youtube" /></a>
                <a href="https://www.linkedin.com/in/vathan-silva/"><Linkedin className="linkedin" /></a>
                <a href="https://github.com/VathanSilva"><Github className="github" /></a>
                <a href="https://francissilva.vercel.app/"><img src={dev} alt="" /></a>
              </div>
        </span>


    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-transparent h-fit shadow-2xl shadow-black ${formatBackground()}`}
      
    >
        

      <h1 className="text-white text-center text-xl font-bold underline">Welcome to My Weather Website</h1>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="Daily Forecast" items={weather.daily} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
    </div>
  );
}

export default App;
