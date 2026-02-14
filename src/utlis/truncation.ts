export function truncateString(str?: string|undefined, stringLenght: number = 8): string {
  if (!str) return 'N/A'; // Ensures str is a string before calling substring
  const firstPart = str.substring(0, stringLenght);
  return str.length > 10 ? `${firstPart}...` : str;
}
