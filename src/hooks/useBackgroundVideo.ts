export const useBackgroundVideo = (condition: string, isDay: boolean): string => {
  const normalized = (condition || "").toLowerCase();

  const getPath = (file: string) => {
    let base = "/";
    if (
      typeof import.meta !== "undefined" &&
      (import.meta as any).env &&
      typeof (import.meta as any).env.BASE_URL === "string"
    ) {
      base = (import.meta as any).env.BASE_URL;
    }
    return base.replace(/\/$/, "") + "/videos/" + file;
  };

  if (normalized.includes("tempestade")) return getPath(isDay ? "storm-day.mp4" : "storm-night.mp4");
  if (normalized.includes("chuva")) return getPath(isDay ? "rain-day.mp4" : "rain-night.mp4");
  if (normalized.includes("nublado") || normalized.includes("cloud")) return getPath(isDay ? "cloudy.mp4" : "cloudy-night.mp4");
  if (!isDay) return getPath("night.mp4");
  return getPath("day.mp4");
};
