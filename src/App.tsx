import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import IndicatorCard from "./components/IndicatorCard";
import ForecastTable from "./components/ForecastTable";
import WeatherMap from "./components/WeatherMap";
import { ThermometerIcon, WindIcon, RainIcon } from "./components/icons";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from "./services/weatherApiWeatherAPI";
import styled from "styled-components";
import { Container } from "./styles/Container";

const Main = styled.main`
  max-width: 1100px;
  margin: 2.5rem auto;
  padding: 0 1.5rem;
`;

const CardsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

// ...existing code...

const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");

  // Busca por coordenadas
  const fetchWeatherByCoords = (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    Promise.all([
      getWeatherByCoords(lat, lon),
      getForecastByCoords(lat, lon, 3),
    ])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
        if (weatherData?.location?.name) setCity(weatherData.location.name);
      })
      .catch(() => setError("Erro ao buscar dados do tempo"))
      .finally(() => setLoading(false));
  };

  // Busca por cidade
  const fetchWeatherByCityHandler = (cityName: string) => {
    setLoading(true);
    setError(null);
    Promise.all([getWeatherByCity(cityName), getForecastByCity(cityName, 3)])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
      })
      .catch(() => {
        setError("Cidade não encontrada");
        setLoading(false);
      });
  };

  // Busca inicial: Brasília e atualização automática a cada 15 minutos
  useEffect(() => {
    let cityAtual = "Brasília";
    let lastCity = cityAtual;
    let interval: NodeJS.Timeout;

    const fetchAndSchedule = (cityName: string) => {
      fetchWeatherByCityHandler(cityName);
      lastCity = cityName;
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        fetchWeatherByCityHandler(lastCity);
      }, 15 * 60 * 1000); // 15 minutos
    };

    fetchAndSchedule(cityAtual);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Atualiza o agendamento quando buscar nova cidade manualmente
  useEffect(() => {
    if (!city) return;
    // Não reagendar se city foi atualizado por localização (pois já está atualizado)
    if (weather && weather.location && city === weather.location.name) return;
    let interval: NodeJS.Timeout;
    fetchWeatherByCityHandler(city);
    interval = setInterval(() => {
      fetchWeatherByCityHandler(city);
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  // Usar localização atual
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setError("Não foi possível obter sua localização");
        setLoading(false);
      }
    );
  };

  return (
    <Container>
      <Header />
      <Main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
            width: "100%",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Buscar cidade..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1.5px solid #b5cfff",
                fontSize: 17,
                minWidth: 180,
                flex: 1,
                boxShadow: "0 2px 8px rgba(79,142,247,0.07)",
                outline: "none",
                background: "rgba(255,255,255,0.85)",
                transition: "border 0.2s",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchWeatherByCityHandler(city);
              }}
              disabled={loading}
            />
            <button
              onClick={() => fetchWeatherByCityHandler(city)}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: "#4f8ef7",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(79,142,247,0.10)",
                transition: "background 0.2s",
                minWidth: 90,
              }}
              disabled={loading || !city}
            >
              Buscar
            </button>
            <button
              onClick={handleUseLocation}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: "#5bc0de",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(91,192,222,0.10)",
                transition: "background 0.2s",
                minWidth: 90,
              }}
              disabled={loading}
            >
              Usar minha localização
            </button>
          </div>
          {error && (
            <span
              style={{
                color: "#d94b4b",
                fontWeight: 500,
                fontSize: 15,
                marginTop: 4,
                textAlign: "center",
                background: "rgba(255,230,230,0.7)",
                borderRadius: 8,
                padding: "6px 14px",
                boxShadow: "0 1px 4px rgba(217,75,75,0.07)",
                display: "inline-block",
                maxWidth: "100%",
              }}
            >
              {error}
            </span>
          )}
        </div>
        <CardsRow>
          <IndicatorCard
            icon={<ThermometerIcon />}
            label="Temperature"
            value={
              loading
                ? "Carregando..."
                : weather?.current?.temp_c
                ? `${weather.current.temp_c}°C`
                : "--"
            }
            color={"#ff6b6b"}
          />
          <IndicatorCard
            icon={<WindIcon />}
            label="Wind"
            value={
              loading
                ? "Carregando..."
                : weather?.current?.wind_kph
                ? `${weather.current.wind_kph} km/h`
                : "--"
            }
            color={"#5bc0de"}
          />
          <IndicatorCard
            icon={<RainIcon />}
            label="Rain"
            value={
              loading
                ? "Carregando..."
                : weather?.current?.condition?.text || "--"
            }
            color={"#4a90e2"}
          />
        </CardsRow>
        <ForecastTable forecast={forecast} />
        <WeatherMap forecast={forecast} />
      </Main>
    </Container>
  );
};

export default App;
