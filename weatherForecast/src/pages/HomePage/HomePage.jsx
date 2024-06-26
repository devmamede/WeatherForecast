import { useState, useEffect } from "react";
import "../../global.css";
import editIcon from "../../assets/editIcon.png";
import removeIcon from "../../assets/removeIcon.png";

export const HomePage = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    document.body.classList.add("home-page-body");
    const loadedCities = JSON.parse(localStorage.getItem("cities"));
    const loadedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (loadedCities && loadedWeatherData) {
      setCities(loadedCities);
      setWeatherData(loadedWeatherData);
    }
    return () => {
      document.body.classList.remove("home-page-body");
    };
  }, []);

  const apiKey = "f57695816e3c138a7e222f2e119a1678";

  const getWeatherData = async (cityName) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
      const res = await fetch(apiWeatherURL);
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do clima");
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
        const updatedCities = [...cities, newCity];
        const updatedWeatherData = { ...weatherData, [newCity]: data };
        setCities(updatedCities);
        setWeatherData(updatedWeatherData);
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData));
      }
    }
    setCity(""); // Limpa o input após adicionar a cidade
  };

  const handleShare = async (cityName) => {
    const weather = weatherData[cityName];
    const shareData = {
      title: `Confira a temperatura atual do(a) ${weather.name}`,
      text: `${weather.name} está fazendo ${parseInt(weather.main.temp)}°C e ${
        weather.weather[0].description
      }. A umidade é ${weather.main.humidity}%, e com ventos de ${parseInt(
        weather.wind.speed
      )} km/h.`,
    };

    try {
      await navigator.share(shareData);
      console.log("Weather shared successfully!");
    } catch (error) {
      console.error("Error sharing the weather:", error);
    }
  };

  const handleRemoveCity = (cityName) => {
    const updatedCities = cities.filter((city) => city !== cityName);
    const updatedWeatherData = { ...weatherData };
    delete updatedWeatherData[cityName];
    setCities(updatedCities);
    setWeatherData(updatedWeatherData);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData));
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
        // Se o nome não mudou, simplesmente sai do modo de edição
        setEditMode({ ...editMode, [oldCityName]: false });
      }
    }
  };

  return (
    <div className="home-page-container">
      <div className="search-section">
        <input
          className="city-input"
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={() => handleSearch()}>
          Pesquisar
        </button>
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

                    <button
                      className="actions"
                      onClick={() => handleEditCity(cityName)}
                    >
                      <img src={editIcon} alt="" />
                    </button>
                    <button
                      className="actions"
                      onClick={() => handleRemoveCity(cityName)}
                    >
                      <img src={removeIcon} alt="" />
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

              <button
                className="share-button"
                onClick={() => handleShare(cityName)}
              >
                Compartilhar
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
