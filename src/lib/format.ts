export function formatPrix(prix: number, devise: string) {
  if (prix >= 1000000) {
    return `${(prix / 1000000).toFixed(1).replace(".0", "")} M ${devise}`;
  }
  return `${prix.toLocaleString("fr-FR")} ${devise}`;
}
