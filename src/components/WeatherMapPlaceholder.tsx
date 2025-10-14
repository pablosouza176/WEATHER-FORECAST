import React from "react";
import styled from "styled-components";

const MapWrapper = styled.div`
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 2rem;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f8ef7;
  font-size: 1.3rem;
`;

const WeatherMapPlaceholder: React.FC = () => (
  <MapWrapper>[Mapa interativo de condições do tempo - placeholder]</MapWrapper>
);

export default WeatherMapPlaceholder;
