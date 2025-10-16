import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import IndicatorCard from "./components/IndicatorCard";
import ForecastTable from "./components/ForecastTable";
import WeatherMap from "./components/WeatherMap";
import { ThermometerIcon, WindIcon, RainIcon, UvIcon } from "./components/icons";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from "./services/weatherApiWeatherAPI";
import styled from "styled-components";
import { Container } from "./styles/Container";
import { useBackgroundVideo } from "./hooks/useBackgroundVideo";

const Main = styled.main`
  max-width: 1500px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
`;

const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 50px;
  margin-bottom: 32px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding-left: 0;
    padding-right: 0;
  }
`;


const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Updates the digital clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Date formatting
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Time formatting
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Fetch by coordinates
  const fetchWeatherByCoords = (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    Promise.all([
      getWeatherByCoords(lat, lon),
      getForecastByCoords(lat, lon, 3),
      getForecastByCoords(lat, lon, 7),
    ])
      .then(([weatherData, forecastData, weeklyData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
        setWeeklyForecast(weeklyData);
        if (weatherData?.location?.name) setCity(weatherData.location.name);
      })
      .catch(() => setError("Erro ao buscar dados do tempo"))
      .finally(() => setLoading(false));
  };

  // Fetch by city
  const fetchWeatherByCityHandler = (cityName: string) => {
    setLoading(true);
    setError(null);
    Promise.all([
      getWeatherByCity(cityName),
      getForecastByCity(cityName, 3),
      getForecastByCity(cityName, 7),
    ])
      .then(([weatherData, forecastData, weeklyData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
        setWeeklyForecast(weeklyData);
      })
      .catch(() => {
        setError("Cidade não encontrada");
      })
      .finally(() => setLoading(false));
  };

  // Initial fetch: Brasília and auto-update every 15 minutes
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
  }, 15 * 60 * 1000); // 15 minutes
    };

    fetchAndSchedule(cityAtual);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Updates the schedule when searching for a new city manually
  useEffect(() => {
    if (!city) return;
  // Do not reschedule if city was updated by location (already updated)
    if (weather && weather.location && city === weather.location.name) return;
    let interval: NodeJS.Timeout;
    fetchWeatherByCityHandler(city);
    interval = setInterval(() => {
      fetchWeatherByCityHandler(city);
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city, weather]);

  // Use current location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        let msg = "Não foi possível obter sua localização.";
        if (err) {
          if (err.code === 1) msg = "Permissão de localização negada pelo usuário.";
          else if (err.code === 2) msg = "Localização indisponível.";
          else if (err.code === 3) msg = "Tempo de solicitação de localização excedido.";
          msg += ` (Erro: ${err.message})`;
        }
        setError(msg);
        setLoading(false);
  // Detailed log for debugging
  // eslint-disable-next-line no-console
        console.error("Erro ao obter localização:", err);
      },
      { timeout: 10000 }
    );
  };

  // Determines the weather condition for the background
  const condition = weather?.current?.condition?.text || "";
  const isDay = weather?.current?.is_day === 1;
  const backgroundVideo = useBackgroundVideo(condition, isDay);

  return (
    <div
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
  {/* Removed global background video to not overlay the dashboard */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" style={{zIndex: 1}}></div>
      <Container style={{position: "relative", zIndex: 10, width: "100%"}}>
        <Header />
  {/* Background video behind cards, table and map */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1, position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', objectFit: 'cover', background: '#b3d8ff', pointerEvents: 'none' }}
          onError={e => (e.currentTarget.style.display = 'none')}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
  {/* Overlay for readability */}
        <div style={{position: 'relative', zIndex: 10}}>
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
              {/* Block with city, clock and date */}
              {city && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.55)',
                  borderRadius: 18,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                  padding: '28px 38px 22px 38px',
                  marginBottom: 22,
                  maxWidth: 600,
                  width: '100%',
                }}>
                  <span style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#fff',
                    letterSpacing: 1.5,
                    marginBottom: 10,
                    textAlign: 'center',
                    textShadow: '0 4px 16px rgba(0,0,0,0.45)',
                  }}>{city}</span>
                  <span style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: '#ffe066',
                    marginBottom: 6,
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    textShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  }}>{formatTime(currentTime)}</span>
                  <span style={{
                    fontSize: 24,
                    color: '#fff',
                    fontWeight: 600,
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    textShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  }}>{formatDate(currentTime)}</span>
                </div>
              )}
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
              label="Temperatura"
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
              label="Vento"
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
              label="Chuva"
              value={
                loading
                  ? "Carregando..."
                  : weather?.current?.condition?.text || "--"
              }
              color={"#4a90e2"}
            />
            <IndicatorCard
              icon={<UvIcon />}
              label="Índice UV"
              value={
                loading
                  ? "Carregando..."
                  : weather?.current?.uv !== undefined
                  ? weather.current.uv
                  : "--"
              }
              color={"#f7e967"}
            />
          </CardsRow>
          {weeklyForecast && (
            <div style={{marginTop: 32}}>
              <ForecastTable forecast={weeklyForecast} />
            </div>
          )}
          <div style={{ width: "auto", height: "auto" }}>
            <WeatherMap forecast={forecast} />
          </div>
        </Main>
        </div>
      </Container>
    </div>
  );
};

export default App;
