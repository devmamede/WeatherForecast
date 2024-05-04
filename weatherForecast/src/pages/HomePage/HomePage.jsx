// Modelo 5

import { useState } from "react";

export const HomePage = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [editMode, setEditMode] = useState({});

  const getWeatherData = async (cityName) => {
    try {
      const res = await fetch(`http://localhost:5000/weather?city=${cityName}`);
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do clima - Resposta não OK");
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
    setCity(""); // Limpa o input após adicionar a cidade
  };

  const handleRemoveCity = (cityName) => {
    setCities(cities.filter((city) => city !== cityName));
    const newWeatherData = { ...weatherData };
    delete newWeatherData[cityName];
    setWeatherData(newWeatherData);
  };

  const handleEditCity = (cityName) => {
    setEditMode({ ...editMode, [cityName]: !editMode[cityName] });
  };

  const handleUpdateCity = async (event, oldCityName) => {
    if (event.key === "Enter") {
      const newCityName = event.target.value.trim();
      if (
        newCityName &&
        newCityName !== oldCityName &&
        !cities.includes(newCityName)
      ) {
        // Remove a cidade antiga dos estados cities e weatherData
        const filteredCities = cities.filter((city) => city !== oldCityName);
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
        // Se o nome não mudou,  sai do modo de edição
        setEditMode({ ...editMode, [oldCityName]: false });
      }
    }
  };

  const handleRegister = async () => {
    try {
      const query =
        "INSERT INTO weather_data (location_name, temperature, humidity, wind, thermal_sensation) VALUES ($1, $2, $3, $4, $5)";
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div onClick={() => handleRegister()} className="home-page-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={() => handleSearch()}>Pesquisar</button>
      </div>
      <div
        className="results-section"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {cities.map((cityName, index) =>
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
                    <img
                      className="countryFlag"
                      src={`https://flagsapi.com/${weatherData[cityName].sys.country}/flat/24.png`}
                      alt="Bandeira do país"
                    />
                    <button onClick={() => handleEditCity(cityName)}>
                      Editar
                    </button>
                    <button onClick={() => handleRemoveCity(cityName)}>
                      Remover
                    </button>
                  </h2>
                )}
              </div>
              <p className="temperature">
                {parseInt(weatherData[cityName].main.temp)}&deg;C
              </p>
              <div className="description-container">
                <p className="description">
                  {weatherData[cityName].weather[0].description}
                </p>
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
                  Ventos de{" "}
                  {`${parseInt(weatherData[cityName].wind.speed)} km/h`}
                </p>
                <p className="sensation">
                  Sensação Térmica de{" "}
                  {parseInt(weatherData[cityName].main.feels_like)}°C
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
