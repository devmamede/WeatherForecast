import { useState } from "react";
import "../../global.css";

export const HomePage = () => {
  const apiKey = "f57695816e3c138a7e222f2e119a1678";
  // Alterado para suportar três cidades
  const [cities, setCities] = useState(["", "", ""]);
  const [weatherData, setWeatherData] = useState([null, null, null]);

  const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  };

  const showWeatherData = async (index) => {
    const data = await getWeatherData(cities[index]);
    setWeatherData(
      weatherData.map((item, idx) => (idx === index ? data : item))
    );
  };

  return (
    <div className="container">
      <div className="form">
        <h3 className="title">Confira o clima de três cidades:</h3>
        <div className="form-input-container">
          {cities.map((city, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <input
                type="text"
                placeholder={`Digite o nome da cidade ${index + 1}`}
                className="cityInput"
                value={city}
                onChange={(e) => {
                  const newCities = [...cities];
                  newCities[index] = e.target.value;
                  setCities(newCities);
                }}
                onKeyUp={(e) => e.code === "Enter" && showWeatherData(index)}
              />
              <button className="search" onClick={() => showWeatherData(index)}>
                Pesquisar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {weatherData.map((data, index) =>
          data ? (
            <div key={index} className="weather-data">
              <h2>
                {data.name}
                <img
                  src={`https://flagsapi.com/${data.sys.country}/flat/24.png`}
                  alt="Bandeira do país"
                />
              </h2>
              <p className="temperature">{parseInt(data.main.temp)}&deg;C</p>
              <div className="description-container">
                <p className="description">{data.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="Condições do tempo"
                  className="weather-icon"
                />
              </div>
              <div className="details-container">
                <p className="umidity">
                  Umidade:
                  {` ${data.main.humidity}%`}
                </p>
                <p className="wind">
                  Ventos de
                  {` ${parseInt(data.wind.speed)} km/h`}
                </p>{" "}
              </div>
              <p className="sensation">
                Sensação Térmica de {parseInt(data.main.feels_like)}°C
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

// export const HomePage = () => {
//   const apiKey = "f57695816e3c138a7e222f2e119a1678";
//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);

//   const getWeatherData = async (city) => {
//     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
//     const res = await fetch(apiWeatherURL);
//     const data = await res.json();
//     return data;
//   };

//   const showWeatherData = async (city) => {
//     const data = await getWeatherData(city);
//     setWeatherData(data);
//   };

//   return (
//     <div className="container">
//       <div className="form">
//         <h3 className="title">Confira o clima de uma cidade:</h3>
//         <div className="form-input-container">
//           <input
//             type="text"
//             placeholder="Digite o nome da cidade"
//             className="cityInput"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             onKeyUp={(e) => e.code === "Enter" && showWeatherData(city)}
//           />
//           <button className="search" onClick={() => showWeatherData(city)}>
//             Pesquisar
//           </button>
//         </div>
//       </div>

//       {weatherData && (
//         <div className="weather-data">
//           <h2>
//             {weatherData.name}
//             <img
//               src={`https://flagsapi.com/${weatherData.sys.country}/flat/24.png`}
//               alt="Bandeira do país"
//             />
//           </h2>
//           <p className="temperature">{parseInt(weatherData.main.temp)}&deg;C</p>
//           <div className="description-container">
//             <p className="description">{weatherData.weather[0].description}</p>
//             <img
//               src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
//               alt="Condições do tempo"
//               className="weather-icon"
//             />
//           </div>
//           <div className="details-container">
//             <p className="umidity">
//               Umidade:
//               {` ${weatherData.main.humidity}%`}
//             </p>
//             <p className="wind">
//               Ventos de
//               {` ${parseInt(weatherData.wind.speed)} km/h`}
//             </p>{" "}
//           </div>
//           <p className="sensation">
//             Sensação Térmica de {parseInt(weatherData.main.feels_like)}°C
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };
