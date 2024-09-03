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

  const firstButton = (isXs: boolean) => (
    <IconButton
      aria-label="First"
      disabled={pokemon.length === 0 || selected <= 1}
      sx={
        isXs
          ? { display: { xs: 'inline-flex', sm: 'none' } }
          : { display: { xs: 'none', sm: 'inline-flex' } }
      }
      onClick={() => setSelected(1)}
    >
      <FirstPage />
    </IconButton>
  );
  const lastButtton = (isXs: boolean) => (
    <IconButton
      aria-label="Last"
      disabled={pokemon.length === 0 || selected >= pokemon.length}
      sx={
        isXs
          ? { display: { xs: 'inline-flex', sm: 'none' } }
          : { display: { xs: 'none', sm: 'inline-flex' } }
      }
      onClick={() => {
        if (pokemon.length) {
          setSelected(pokemon.length);
        }
      }}
    >
      <LastPage />
    </IconButton>
  );
  const previousButton = (isXs: boolean) => (
    <IconButton
      aria-label="Previous"
      disabled={pokemon.length === 0 || selected <= 1}
      sx={
        isXs
          ? { display: { xs: 'inline-flex', sm: 'none' } }
          : { display: { xs: 'none', sm: 'inline-flex' } }
      }
      onClick={decrementSelected}
    >
      <ChevronLeft />
    </IconButton>
  );
  const nextButton = (isXs: boolean) => (
    <IconButton
      aria-label="Next"
      disabled={pokemon.length === 0 || selected >= pokemon.length}
      sx={
        isXs
          ? { display: { xs: 'inline-flex', sm: 'none' } }
          : { display: { xs: 'none', sm: 'inline-flex' } }
      }
      onClick={incrementSelected}
    >
      <ChevronRight />
    </IconButton>
  );

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 0, sm: 2 }}
        sx={{ justifyContent: 'center' }}
      >
        {firstButton(false)}
        {previousButton(false)}
        <PokemonAutocomplete width={{ xs: '100%', sm: 320 }} />
        {nextButton(false)}
        {lastButtton(false)}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          mt: 2,
          justifyContent: 'space-between',
        }}
      >
        {firstButton(true)}
        {previousButton(true)}
        {nextButton(true)}
        {lastButtton(true)}
      </Stack>
    </>
  );
}
