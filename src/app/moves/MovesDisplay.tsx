import MovesGrid from './MovesGrid';

export default async function MovesDisplay() {
  const response = await fetch('https://pokeapi.co/api/v2/move?limit=10000');
  const data = await response.json();
  const moves = data.results;

  return <MovesGrid moves={moves} />;
}
