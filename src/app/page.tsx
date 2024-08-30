'use client';

import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { usePokemonStore } from '@/hooks/useStore';
import PokemonSelectBar from '@/components/PokemonSelectBar';
import PokemonDetail from '@/components/PokemonDetail';

export default function Home() {
  const pokemon = usePokemonStore((state) => state.pokemon);
  const selected = usePokemonStore((state) => state.selected);
  const selectedPokemon = useMemo(
    () => pokemon[selected - 1],
    [pokemon, selected],
  );

  return (
    <Container sx={{ pt: 4 }}>
      <PokemonSelectBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        {selectedPokemon && (
          <PokemonDetail id={selected} url={selectedPokemon.url} />
        )}
      </Box>
    </Container>
  );
}
