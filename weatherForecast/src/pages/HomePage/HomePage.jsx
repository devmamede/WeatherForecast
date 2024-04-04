// Modelo 4

import React, { useState, useEffect } from 'react';
import '../../global.css';

export const HomePage = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    document.body.classList.add('home-page-body');
    return () => {
      document.body.classList.remove('home-page-body');
    };
  }, []);

  const apiKey = "f57695816e3c138a7e222f2e119a1678";

  const getWeatherData = async (cityName) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
      const res = await fetch(apiWeatherURL);
      if (!res.ok) {
        throw new Error('Erro ao buscar dados do clima');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      return null;
    }
  };

  const handleSearch = async (newCity = city) => {
    if (newCity && !cities.includes(newCity)) {
      const data = await getWeatherData(newCity);
      if (data) {
        setCities([...cities, newCity]);
        setWeatherData({ ...weatherData, [newCity]: data });
      }
    }
    setCity(''); // Limpa o input após adicionar a cidade
  };

  const handleRemoveCity = (cityName) => {
    setCities(cities.filter(city => city !== cityName));
    const newWeatherData = { ...weatherData };
    delete newWeatherData[cityName];
    setWeatherData(newWeatherData);
  };

  const handleEditCity = (cityName) => {
    setEditMode({ ...editMode, [cityName]: !editMode[cityName] });
  };

  const handleUpdateCity = async (event, oldCityName) => {
    if (event.key === 'Enter') {
      const newCityName = event.target.value.trim();
      if (newCityName && newCityName !== oldCityName && !cities.includes(newCityName)) {
        // Remove a cidade antiga dos estados cities e weatherData
        const filteredCities = cities.filter(city => city !== oldCityName);
        const newWeatherData = { ...weatherData };
        delete newWeatherData[oldCityName];
  
        // Busca os dados da nova cidade
        const data = await getWeatherData(newCityName);
        if (data) {
          // Atualiza os estados com a nova cidade
          setCities([...filteredCities, newCityName]);
          setWeatherData({ ...newWeatherData, [newCityName]: data });
          setEditMode({ ...editMode, [oldCityName]: false }); // Desativa o modo de edição para a cidade antiga
        } else {
          // Se a nova cidade não for encontrada, mantém a cidade antiga e desativa o modo de edição
          setCities(filteredCities);
          setWeatherData(newWeatherData);
          setEditMode({ ...editMode, [oldCityName]: false });
        }
      } else if (newCityName === oldCityName) {
        // Se o nome não mudou, simplesmente sai do modo de edição
        setEditMode({ ...editMode, [oldCityName]: false });
      }
    }
  };

  return (
    <div className="home-page-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={() => handleSearch()}>Pesquisar</button>
      </div>
      <div className="results-section" style={{ display: "flex", justifyContent: "space-around" }}>
        {cities.map((cityName, index) => (
          weatherData[cityName] ? (
            <div key={index} className="weather-data">
              <div className="card-header">
                {editMode[cityName] ? (
                  <input
                    type="text"
                    defaultValue={cityName}
                    onKeyUp={(event) => handleUpdateCity(event, cityName)}
                  />
                ) : (
                  <h2>
                    {weatherData[cityName].name}
                    <img className="countryFlag"
                  src={`https://flagsapi.com/${weatherData[cityName].sys.country}/flat/24.png`}
                  alt="Bandeira do país"
                />
                    <button onClick={() => handleEditCity(cityName)}>Editar</button>
                    <button onClick={() => handleRemoveCity(cityName)}>Remover</button>
                  </h2>
                )}
              </div>
              <p className="temperature">{parseInt(weatherData[cityName].main.temp)}&deg;C</p>
              <div className="description-container">
                <p className="description">{weatherData[cityName].weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData[cityName].weather[0].icon}.png`}
                  alt="Condições do tempo"
                  className="weather-icon"
                />
              </div>
              <div className="details-container">
                <p className="umidity">
                  Umidade: {`${weatherData[cityName].main.humidity}%`}
                </p>
                <p className="wind">
                  Ventos de {`${parseInt(weatherData[cityName].wind.speed)} km/h`}
                </p>
                <p className="sensation">
                  Sensação Térmica de {parseInt(weatherData[cityName].main.feels_like)}°C
                </p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

// Modelo 3

// import React, { useState, useEffect } from 'react';
// import '../../global.css';

// export const HomePage = () => {
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);
//   const [weatherData, setWeatherData] = useState({});

//   useEffect(() => {
//     // Adiciona a classe ao body quando o componente é montado
//     document.body.classList.add('home-page-body');

//     // Remove a classe quando o componente é desmontado
//     return () => {
//       document.body.classList.remove('home-page-body');
//     };
//   }, []);

//   const apiKey = "f57695816e3c138a7e222f2e119a1678";

//   const getWeatherData = async (cityName) => {
//     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=pt_br`;
//     try {
//       const res = await fetch(apiWeatherURL);
//       if (!res.ok) {
//         throw new Error('Erro ao buscar dados do clima');
//       }
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.error("Erro ao buscar dados do clima:", error);
//       return null;
//     }
//   };

//   const handleSearch = async () => {
//     if (city && !cities.includes(city)) {
//       setCities([...cities, city]);
//       const data = await getWeatherData(city);
//       setWeatherData({ ...weatherData, [city]: data });
//       setCity(''); // Limpa o input após adicionar a cidade
//     }
//   };

//   return (
//     <div className="home-page-container">
//       <div className="search-section">
//         <input
//         className='cityInput'
//           type="text"
//           placeholder="Digite o nome da cidade"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
//         />
//         <button onClick={handleSearch}>Pesquisar</button>
//       </div>
//       <div className="results-section" style={{ display: "flex", justifyContent: "space-around" }}>
//         {cities.map((cityName, index) => (
//           weatherData[cityName] ? (
//             <div key={index} className="weather-data">
//               <h2>
//                 {weatherData[cityName].name}
//                 <img className="countryFlag"
//                   src={`https://flagsapi.com/${weatherData[cityName].sys.country}/flat/24.png`}
//                   alt="Bandeira do país"
//                 />
//               </h2>
//               <p className="temperature">{parseInt(weatherData[cityName].main.temp)}&deg;C</p>
//               <div className="description-container">
//                 <p className="description">{weatherData[cityName].weather[0].description}</p>
//                 <img
//                   src={`http://openweathermap.org/img/wn/${weatherData[cityName].weather[0].icon}.png`}
//                   alt="Condições do tempo"
//                   className="weather-icon"
//                 />
//               </div>
//               <div className="details-container">
//                 <p className="umidity">
//                   Umidade: {`${weatherData[cityName].main.humidity}%`}
//                 </p>
//                 <p className="wind">
//                   Ventos de {`${parseInt(weatherData[cityName].wind.speed)} km/h`}
//                 </p>
//               </div>
//               <p className="sensation">
//                 Sensação Térmica de {parseInt(weatherData[cityName].main.feels_like)}°C
//               </p>
//             </div>
//           ) : null
//         ))}
//       </div>
//     </div>
//   );
// };


// Modelo 2

// import { useEffect, useState } from "react";
// import "../../global.css";

// export const HomePage = () => {
//   useEffect(() => {
//     // Adiciona a classe ao body quando o componente é montado
//     document.body.classList.add('home-page-body');

//     // Remove a classe quando o componente é desmontado
//     return () => {
//       document.body.classList.remove('home-page-body');
//     };
//   }, []);

//   const apiKey = "f57695816e3c138a7e222f2e119a1678";
//   // Alterado para suportar três cidades
//   const [cities, setCities] = useState(["", "", ""]);
//   const [weatherData, setWeatherData] = useState([null, null, null]);

//   const getWeatherData = async (city) => {
//     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
//     const res = await fetch(apiWeatherURL);
//     const data = await res.json();
//     return data;
//   };

//   const showWeatherData = async (index) => {
//     const data = await getWeatherData(cities[index]);
//     setWeatherData(
//       weatherData.map((item, idx) => (idx === index ? data : item))
//     );
//   };

//   return (

//     <div className="containerHomePage">
//       <div className="form">
//         <h3 className="title">Confira o clima de três cidades:</h3>
//         <div className="form-input-container">
//           {cities.map((city, index) => (
//             <div
//               key={index}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 marginRight: "20px",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder={`Digite o nome da cidade ${index + 1}`}
//                 className="cityInput"
//                 value={city}
//                 onChange={(e) => {
//                   const newCities = [...cities];
//                   newCities[index] = e.target.value;
//                   setCities(newCities);
//                 }}
//                 onKeyUp={(e) => e.code === "Enter" && showWeatherData(index)}
//               />
//               <button className="search" onClick={() => showWeatherData(index)}>
//                 Pesquisar
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-around" }}>
//         {weatherData.map((data, index) =>
//           data ? (
//             <div key={index} className="weather-data">
//               <h2>
//                 {data.name}
//                 <img className="countryFlag"
//                   src={`https://flagsapi.com/${data.sys.country}/flat/24.png`}
//                   alt="Bandeira do país"
//                 />
//               </h2>
//               <p className="temperature">{parseInt(data.main.temp)}&deg;C</p>
//               <div className="description-container">
//                 <p className="description">{data.weather[0].description}</p>
//                 <img
//                   src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
//                   alt="Condições do tempo"
//                   className="weather-icon"
//                 />
//               </div>
//               <div className="details-container">
//                 <p className="umidity">
//                   Umidade:
//                   {` ${data.main.humidity}%`}
//                 </p>
//                 <p className="wind">
//                   Ventos de
//                   {` ${parseInt(data.wind.speed)} km/h`}
//                 </p>{" "}
//               </div>
//               <p className="sensation">
//                 Sensação Térmica de {parseInt(data.main.feels_like)}°C
//               </p>
//             </div>
//           ) : null
//         )}
//       </div>
//     </div>
//   );
// };

// Modelo 1

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
