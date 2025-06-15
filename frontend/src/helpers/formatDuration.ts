export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} дн${days === 1 ? "ь" : "і"}`);
  if (remainingHours > 0) parts.push(`${remainingHours} год`);
  if (days === 0 && remainingMinutes > 0) parts.push(`${remainingMinutes} хв`);

  return parts.join(" ");
};
