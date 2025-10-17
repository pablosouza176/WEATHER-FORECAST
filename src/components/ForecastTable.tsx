import React from "react";
import styled from "styled-components";
import { WiRain, WiStrongWind, WiDaySunny, WiCloudy, WiNightClear, WiThunderstorm, WiSnow, WiFog } from "react-icons/wi";

const IconDaySunny = WiDaySunny as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconRain = WiRain as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconCloudy = WiCloudy as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconNightClear = WiNightClear as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconThunderstorm = WiThunderstorm as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconSnow = WiSnow as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconFog = WiFog as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
const IconStrongWind = WiStrongWind as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;

const TableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 2.5rem;
  margin: 2.5rem auto 0 auto;
  width: 98%;
  transition: box-shadow 0.3s, transform 0.3s;
  will-change: box-shadow, transform;
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: scale(1.015);
  }
  @media (max-width: 700px) {
    padding: 1rem 0.5rem;
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.7rem 0.5rem;
  color: #4f8ef7;
  font-weight: 600;
  border-bottom: 2px solid #e3e8f0;
`;

const Td = styled.td`
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid #f0f4fa;
  font-size: 1rem;
`;

const ProgressBarBg = styled.div`
  width: 100%;
  background: rgba(59,130,246,0.10);
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
`;
const ProgressBar = styled.div<{ color: string; width: number }>`
  height: 100%;
  background: ${(props) => props.color};
  width: ${(props) => props.width}%;
  transition: width 0.7s cubic-bezier(0.22, 0.9, 0.33, 1);
`;

type ForecastTableProps = {
  forecast?: any;
};

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => {
  const forecastDays = forecast?.forecast?.forecastday || [];
  return (
    <TableWrapper>
      <h2>Detalhamento das condições do tempo por período</h2>
      <Table>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Condição</Th>
            <Th>Temp. Mín</Th>
            <Th>Temp. Méd</Th>
            <Th>Temp. Máx</Th>
            <Th>Vento (km/h)</Th>
            <Th>Chuva (%)</Th>
          </tr>
        </thead>
        <tbody>
          {forecastDays.length > 0 ? (
            forecastDays.map((day: any, idx: number) => {
              const cond = day.day.condition.text.toLowerCase();
              let icon = <IconDaySunny size={22} style={{verticalAlign: 'middle', color: '#FFD600'}} />;
              if (cond.includes("chuva") || cond.includes("rain")) icon = <IconRain size={22} style={{verticalAlign: 'middle', color: '#4a90e2'}} />;
              else if (cond.includes("nublado") || cond.includes("cloud")) icon = <IconCloudy size={22} style={{verticalAlign: 'middle', color: '#90A4AE'}} />;
              else if (cond.includes("noite") || cond.includes("night")) icon = <IconNightClear size={22} style={{verticalAlign: 'middle', color: '#283593'}} />;
              else if (cond.includes("trovoada") || cond.includes("thunder")) icon = <IconThunderstorm size={22} style={{verticalAlign: 'middle', color: '#FFD600'}} />;
              else if (cond.includes("neve") || cond.includes("snow")) icon = <IconSnow size={22} style={{verticalAlign: 'middle', color: '#B3E5FC'}} />;
              else if (cond.includes("neblina") || cond.includes("fog")) icon = <IconFog size={22} style={{verticalAlign: 'middle', color: '#B0BEC5'}} />;

              return (
                <tr key={idx} className={idx % 2 === 0 ? "odd:bg-white/10 even:bg-white/5 hover:bg-white/20 transition" : "even:bg-white/10 odd:bg-white/5 hover:bg-white/20 transition"}>
                  <Td>
                    {new Date(day.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </Td>
                  <Td>{icon} {day.day.condition.text}</Td>
                  <Td>{day.day.mintemp_c}°C</Td>
                  <Td>{day.day.avgtemp_c}°C</Td>
                  <Td>{day.day.maxtemp_c}°C</Td>
                  <Td style={{minWidth: 90}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <IconStrongWind size={18} style={{opacity: 0.7, color: '#5bc0de'}} />
                      <span style={{minWidth: 28}}>{day.day.maxwind_kph}</span>
                    </div>
                    <ProgressBarBg>
                      <ProgressBar color="#5bc0de" width={Math.min(day.day.maxwind_kph, 100)} />
                    </ProgressBarBg>
                  </Td>
                  <Td style={{minWidth: 90}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <IconRain size={18} style={{opacity: 0.7, color: '#4a90e2'}} />
                      <span style={{minWidth: 28}}>{day.day.daily_chance_of_rain}%</span>
                    </div>
                    <ProgressBarBg>
                      <ProgressBar color="#4a90e2" width={day.day.daily_chance_of_rain} />
                    </ProgressBarBg>
                  </Td>
                </tr>
              );
            })
          ) : (
            <tr>
              <Td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                Sem dados de previsão disponíveis.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default ForecastTable;
