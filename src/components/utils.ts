// utils.ts
export function getTimeZone(offsetSeconds: number): string {
  const offsetHours: number = offsetSeconds / 3600; // Convert seconds to hours
  const timeZone: string = `Etc/GMT${offsetHours >= 0 ? "-" : "+"}${Math.abs(
    offsetHours
  )}`;
  return timeZone;
}

export function formatSunriseSunset(
  sunriseMilliseconds: number,
  sunsetMilliseconds: number,
  timeZone: string
): { formattedSunrise: string; formattedSunset: string } {
  const sunriseDate: Date = new Date(sunriseMilliseconds);
  const sunsetDate: Date = new Date(sunsetMilliseconds);

  const formattedSunrise: string = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(sunriseDate);

  const formattedSunset: string = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(sunsetDate);

  return { formattedSunrise, formattedSunset };
}
