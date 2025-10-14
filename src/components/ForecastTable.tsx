import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  margin: 2.5rem auto 0 auto;
  width: 90%;
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

const Bar = styled.div<{ color: string; width: number; gradient?: string }>`
  height: 8px;
  border-radius: 8px;
  background: ${(props) => props.gradient || props.color};
  width: ${(props) => props.width}%;
  min-width: 8px;
  transition: width 0.7s cubic-bezier(0.22, 0.9, 0.33, 1);
`;

// Tipagem para os dados de forecast
type ForecastTableProps = {
  forecast?: any;
};

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => {
  // forecast.forecast.forecastday[]
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
            forecastDays.map((day: any, idx: number) => (
              <tr key={idx}>
                <Td>
                  {new Date(day.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </Td>
                <Td>{day.day.condition.text}</Td>
                <Td>
                  <Bar
                    color="#f76c6c"
                    width={day.day.mintemp_c}
                    gradient="linear-gradient(90deg, #ffd6d6, #ff6b6b)"
                  />{" "}
                  {day.day.mintemp_c}°C
                </Td>
                <Td>
                  <Bar
                    color="#f7b267"
                    width={day.day.avgtemp_c}
                    gradient="linear-gradient(90deg, #ffe7b2, #f7b267)"
                  />{" "}
                  {day.day.avgtemp_c}°C
                </Td>
                <Td>
                  <Bar
                    color="#f76c6c"
                    width={day.day.maxtemp_c}
                    gradient="linear-gradient(90deg, #ffd6d6, #ff6b6b)"
                  />{" "}
                  {day.day.maxtemp_c}°C
                </Td>
                <Td>
                  <Bar
                    color="#5bc0de"
                    width={day.day.maxwind_kph / 2}
                    gradient="linear-gradient(90deg, #9ee6c5, #5bc0de)"
                  />{" "}
                  {day.day.maxwind_kph}
                </Td>
                <Td>
                  <Bar
                    color="#4a90e2"
                    width={day.day.daily_chance_of_rain}
                    gradient="linear-gradient(90deg, #a8d8ff, #4a90e2)"
                  />{" "}
                  {day.day.daily_chance_of_rain}%
                </Td>
              </tr>
            ))
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
