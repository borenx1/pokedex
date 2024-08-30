'use client';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';

import { usePokemonStore } from '@/hooks/useStore';
import PokemonAutocomplete from '@/components/PokemonAutocomplete';

export default function PokemonSelectBar() {
  const pokemon = usePokemonStore((state) => state.pokemon);
  const selected = usePokemonStore((state) => state.selected);
  const incrementSelected = usePokemonStore((state) => state.incrementSelected);
  const decrementSelected = usePokemonStore((state) => state.decrementSelected);
  const setSelected = usePokemonStore((state) => state.setSelected);

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
      <IconButton
        aria-label="First"
        disabled={pokemon.length === 0 || selected <= 1}
        onClick={() => setSelected(1)}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        aria-label="Previous"
        disabled={pokemon.length === 0 || selected <= 1}
        onClick={decrementSelected}
      >
        <ChevronLeft />
      </IconButton>
      <PokemonAutocomplete />
      <IconButton
        aria-label="Next"
        disabled={pokemon.length === 0 || selected >= pokemon.length}
        onClick={incrementSelected}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        aria-label="Last"
        disabled={pokemon.length === 0 || selected >= pokemon.length}
        onClick={() => {
          if (pokemon.length) {
            setSelected(pokemon.length);
          }
        }}
      >
        <LastPage />
      </IconButton>
    </Stack>
  );
}
