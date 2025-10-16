import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const Card = styled.div<{ color: string }>`
  background: ${colors.cardBg};
  backdrop-filter: blur(12px);
  border-radius: 1.1rem;
  box-shadow: 0 4px 18px rgba(37,99,235,0.10);
  border: 1.2px solid ${colors.cardBorder};
  padding: 1.1rem 1rem;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 4px solid ${(props) => props.color};
  transition: box-shadow 0.25s, transform 0.25s;
  will-change: box-shadow, transform;
  &:hover {
    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
    transform: scale(1.02);
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  font-size: 1rem;
  color: #e5e7eb;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
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
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ width: '100%' }}
  >
    <Card color={color}>
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {/* Placeholder visual para o gráfico */}
      <SparklinePlaceholder />
      {children}
    </Card>
  </motion.div>
);

export default IndicatorCard;
