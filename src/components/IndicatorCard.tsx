import React from "react";
import styled from "styled-components";

const Card = styled.div<{ color: string }>`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 1.2rem;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 5px solid ${(props) => props.color};
  transition: box-shadow 0.3s, transform 0.3s;
  will-change: box-shadow, transform;
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: scale(1.025);
  }
  @media (max-width: 700px) {
    min-width: 0;
    width: 100%;
  }
`;

const Icon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  font-size: 1.1rem;
  color: #888;
`;

const Value = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0.2rem 0 0.5rem 0;
`;

interface IndicatorCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  sparklineData?: number[];
  children?: React.ReactNode;
}

const SparklinePlaceholder = styled.div`
  width: 100%;
  height: 36px;
  background: linear-gradient(90deg, #e3eafc 0%, #f7faff 100%);
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  icon,
  label,
  value,
  color,
  sparklineData,
  children,
}) => (
  <Card color={color}>
    <Icon>{icon}</Icon>
    <Label>{label}</Label>
    <Value>{value}</Value>
    {/* Placeholder visual para o gráfico */}
    <SparklinePlaceholder />
    {children}
  </Card>
);

export default IndicatorCard;
