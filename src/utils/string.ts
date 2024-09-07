/**
 * Format the Pokemon name from the API to be more readable.
 * E.g. "bulbasaur" -> "Bulbasaur", "great-tusk" -> "Great Tusk".
 * @param name Name from the Pokemon API.
 * @returns The formatted string.
 */
export function formatPokemonName(name: string) {
  return name
    .split('-')
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ');
}

/**
 * Format the Pokemon move name from the API to be more readable.
 * @param name Name from the Pokemon API.
 * @returns The formatted string.
 */
export function formatPokemonMove(name: string) {
  return formatPokemonName(name.replace('--', '-'));
}
