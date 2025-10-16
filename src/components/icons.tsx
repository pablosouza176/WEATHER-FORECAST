import React from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
export function UvIcon() {
  return <WbSunnyIcon aria-label="índice uv" sx={{ color: '#FFD600', fontSize: 45 }} />;
}

export function ThermometerIcon() {
  return <ThermostatIcon aria-label="termômetro" sx={{ color: '#FF5252', fontSize: 45 }} />;
}

export function WindIcon() {
  return <AirIcon aria-label="vento" sx={{ color: '#40C4FF', fontSize: 45 }} />;
}

export function RainIcon() {
  return <UmbrellaIcon aria-label="chuva" sx={{ color: '#1976D2', fontSize: 45 }} />;
}
