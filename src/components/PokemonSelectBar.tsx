'use client';

import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';

import { usePokemonStore } from '@/hooks/useStore';
import PokemonAutocomplete from '@/components/PokemonAutocomplete';

export default function PokemonSelectBar() {
  // @ts-ignore
  const smAndUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const pokemon = usePokemonStore((state) => state.pokemon);
  const selected = usePokemonStore((state) => state.selected);
  const incrementSelected = usePokemonStore((state) => state.incrementSelected);
  const decrementSelected = usePokemonStore((state) => state.decrementSelected);
  const setSelected = usePokemonStore((state) => state.setSelected);

  const firstButton = (
    <IconButton
      aria-label="First"
      disabled={pokemon.length === 0 || selected <= 1}
      onClick={() => setSelected(1)}
    >
      <FirstPage />
    </IconButton>
  );
  const lastButtton = (
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
  );
  const previousButton = (
    <IconButton
      aria-label="Previous"
      disabled={pokemon.length === 0 || selected <= 1}
      onClick={decrementSelected}
    >
      <ChevronLeft />
    </IconButton>
  );
  const nextButton = (
    <IconButton
      aria-label="Next"
      disabled={pokemon.length === 0 || selected >= pokemon.length}
      onClick={incrementSelected}
    >
      <ChevronRight />
    </IconButton>
  );

  return smAndUp ? (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
      {firstButton}
      {previousButton}
      <PokemonAutocomplete width={320} />
      {nextButton}
      {lastButtton}
    </Stack>
  ) : (
    <>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <PokemonAutocomplete width="100%" />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: 'space-between' }}
      >
        {firstButton}
        {previousButton}
        {nextButton}
        {lastButtton}
      </Stack>
    </>
  );
}
