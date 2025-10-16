export async function getForecastByCity(city: string, days: number = 3) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&days=${days}&lang=pt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar previsão do tempo");
  return res.json();
}

export async function getForecastByCoords(
  lat: number,
  lon: number,
  days: number = 3
) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&lang=pt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar previsão do tempo");
  return res.json();
}

const API_KEY = "a7a17623a30a4139b4d152238251110";
const BASE_URL = "https://api.weatherapi.com/v1";

export async function getWeatherByCity(city: string) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&lang=pt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados do tempo");
  return res.json();
}

export async function getWeatherByCoords(lat: number, lon: number) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&lang=pt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados do tempo");
  return res.json();
}
