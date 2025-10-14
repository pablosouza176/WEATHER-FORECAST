// Serviço para buscar condições do tempo usando OpenWeatherMap

const API_KEY = "adf9e2b2fcdf97e077f910dce35e683b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCoords(lat: number, lon: number) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados do tempo");
  return res.json();
}

export async function getForecastByCoords(lat: number, lon: number) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar previsão do tempo");
  return res.json();
}
