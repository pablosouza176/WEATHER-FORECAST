import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const Card = styled.div<{ color: string }>`
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 6px 24px rgba(37,99,235,0.13);
  border: 1.5px solid ${colors.cardBorder};
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 5px solid ${(props) => props.color};
  transition: box-shadow 0.25s, transform 0.25s;
  will-change: box-shadow, transform;
  &:hover {
    box-shadow: 0 12px 40px rgba(37,99,235,0.22);
    transform: scale(1.04);
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  margin-bottom: 0.7rem;
`;

const Label = styled.div`
  font-size: 1.35rem;
  color: #e5e7eb;
  font-weight: 500;
  margin-bottom: 0.1rem;
`;

const Value = styled.div`
  color: ${(props) => props.color || '#1976D2'};
  margin: 0.3rem 0 0.7rem 0;
  text-align: center;
  font-size: 3.2rem;
  font-weight: 800;
`;

interface IndicatorCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  color: string;
  sparklineData?: number[];
  children?: React.ReactNode;
}


export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  icon,
  label,
  value,
  color,
  valueColor,
  sparklineData,
  children,
}) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card color={color}>
        <Icon>{icon}</Icon>
        <Value color={valueColor}>{value}</Value>
  <Label>{label}</Label>
  {children}
      </Card>
    </motion.div>
  </>
);
