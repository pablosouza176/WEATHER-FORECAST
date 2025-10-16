import chroma from "chroma-js";

// Exemplo de função para obter cor baseada na temperatura
export function getTemperatureColor(tempC: number) {
  // Escala de -10°C (azul escuro) a 40°C (vermelho)
  const tempColors = chroma.scale(['#2E3192', '#1BFFFF', '#FFFF00', '#FF0000']).domain([-10, 40]);
  return tempColors(tempC).hex();
}
