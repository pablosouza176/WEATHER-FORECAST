import { getTemperatureColor } from "../utils/temperatureColor";
import L from "leaflet";
import React, { useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity";
// Component to add animated wind layer
const WindLayer: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    fetch("/wind-global.json")
      .then((r) => r.json())
      .then((data) => {
  // @ts-ignore
        const velocityLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "Global Wind",
            displayPosition: "bottomleft",
            displayEmptyString: "No wind data",
          },
          data,
          maxVelocity: 15,
          velocityScale: 0.005,
          colorScale: ["#00FFFF", "#FFFF00", "#FF0000"],
        });
        velocityLayer.addTo(map);
        return () => {
          map.removeLayer(velocityLayer);
        };
      });
  }, [map]);
  return null;
};

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
};

const WeatherMap: React.FC<WeatherMapProps> = ({ forecast }) => {
  // Centered on Brazil by default
  const center: LatLngExpression = [-15.78, -47.93];
  // If forecast exists, create markers for each day/location
  let markers: { pos: [number, number]; label: string; color: string }[] = [];
  if (forecast?.location && forecast?.forecast?.forecastday) {
    const { lat, lon, name } = forecast.location;
    markers = forecast.forecast.forecastday.map((day: any) => ({
      pos: [lat, lon],
      label: `${name} ${new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })}: ${day.day.avgtemp_c}°C, ${day.day.condition.text}`,
      color: getTemperatureColor(day.day.avgtemp_c),
    }));
  }

  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: 720, width: "100%" }}
        scrollWheelZoom={false}
      >
  {/* Satellite layer (Ventusky style, MapTiler) */}
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
          url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=ns9IdHx66rEbdzfVFDSJ"
        />
  {/* Precipitation layer from OpenWeatherMap */}
        <TileLayer
          url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=adf9e2b2fcdf97e077f910dce35e683b"
          opacity={0.6}
        />
  {/* Wind layer from OpenWeatherMap */}
        <TileLayer
          url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=adf9e2b2fcdf97e077f910dce35e683b"
          opacity={0.5}
        />
  {/* Animated wind vectors layer */}
        <WindLayer />
        {markers.map((m, i) => {
          // Cria um ícone customizado colorido para cada temperatura
          const icon = L.divIcon({
            className: '',
            html: `<div style="background:${m.color};width:22px;height:22px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);"></div>`
          });
          return (
            <Marker key={i} position={m.pos} icon={icon}>
              <Popup>{m.label}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </MapWrapper>
  );
};

export default WeatherMap;
