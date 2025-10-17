import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "../styles/WeatherMap.module.css";
import { getTemperatureColor } from "../utils/temperatureColor";

const MapWrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2.5rem auto 0 auto;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  will-change: box-shadow, transform;
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: scale(1.015);
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

type WeatherMapProps = {
  forecast?: any;
  mode?: "temperature" | "precipitation";
};

const WeatherMap: React.FC<WeatherMapProps> = ({
  forecast,
  mode = "temperature",
}) => {
  const center = useMemo(() => ({ latitude: -15.78, longitude: -47.93 }), []);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [viewState, setViewState] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 4,
  });

  const tempPoints = useMemo(() => {
    if (!forecast?.location || !forecast?.forecast?.forecastday) return [];
    const { lat, lon, name } = forecast.location;
    return forecast.forecast.forecastday.map((day: any) => ({
      latitude: lat,
      longitude: lon,
      temp: day.day.avgtemp_c,
      label: `${name} ${new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })}: ${day.day.avgtemp_c}°C, ${day.day.condition.text}`,
      color: getTemperatureColor(day.day.avgtemp_c),
    }));
  }, [forecast]);

  const precipPoints = useMemo(() => {
    if (!forecast?.location || !forecast?.forecast?.forecastday) return [];
    const { lat, lon, name } = forecast.location;
    return forecast.forecast.forecastday.map((day: any) => ({
      latitude: lat,
      longitude: lon,
      precip: day.day.totalprecip_mm,
      label: `${name} ${new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })}: ${day.day.totalprecip_mm}mm, ${day.day.condition.text}`,
    }));
  }, [forecast]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });
        setViewState({ latitude, longitude, zoom: 16 });
      },
      (err) => {
        alert("Não foi possível obter sua localização.");
      },
      { timeout: 10000 }
    );
  };

  return (
    <MapWrapper>
      <div className={styles["weather-map-container"]}>
        <button
          onClick={handleLocate}
          style={{
            padding: "8px 16px",
            borderRadius: 10,
            background: "#5bc0de",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(91,192,222,0.10)",
            transition: "background 0.2s",
            minWidth: 120,
          }}
        >
          Minha localização
        </button>
      </div>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "500px" }}
        mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=ns9IdHx66rEbdzfVFDSJ"
      >
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <div
              className={styles["weather-map-user-location"]}
              title="Você está aqui"
            >
              <span role="img" aria-label="localização">
                📍
              </span>
            </div>
          </Marker>
        )}
        {mode === "temperature" &&
          tempPoints.map((p: any, i: number) => (
            <Marker
              key={i}
              longitude={p.longitude}
              latitude={p.latitude}
              anchor="bottom"
            >
              <div
                className={styles["weather-map-temp-point"]}
                style={{ background: p.color }}
                title={p.label}
              >
                {Math.round(p.temp)}°C
              </div>
            </Marker>
          ))}
        {mode === "precipitation" &&
          precipPoints.map((p: any, i: number) => (
            <Marker
              key={i}
              longitude={p.longitude}
              latitude={p.latitude}
              anchor="bottom"
            >
              <div
                className={styles["weather-map-precip-point"]}
                title={p.label}
              >
                {Math.round(p.precip)}mm
              </div>
            </Marker>
          ))}
      </Map>
    </MapWrapper>
  );
};

export default WeatherMap;
