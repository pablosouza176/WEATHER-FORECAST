import React from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapWrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2.5rem auto 0 auto;
  min-height: 240px;
  width: 90%;
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
};

const WeatherMap: React.FC<WeatherMapProps> = ({ forecast }) => {
  // Centraliza no Brasil por padrão
  const center: LatLngExpression = [-15.78, -47.93];
  // Se houver forecast, cria marcadores para cada dia/localidade
  let markers: { pos: [number, number]; label: string }[] = [];
  if (forecast?.location && forecast?.forecast?.forecastday) {
    const { lat, lon, name } = forecast.location;
    markers = forecast.forecast.forecastday.map((day: any) => ({
      pos: [lat, lon],
      label: `${name} ${new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })}: ${day.day.avgtemp_c}°C, ${day.day.condition.text}`,
    }));
  }

  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: 240, width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {markers.map((m, i) => (
          <Marker key={i} position={m.pos}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default WeatherMap;
