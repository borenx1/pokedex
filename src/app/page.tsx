import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

import PokemonAutocomplete from '@/components/PokemonAutocomplete';

export default function Home() {
  return (
    <Container sx={{ pt: 4 }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <IconButton aria-label="Previous">
          <ChevronLeft />
        </IconButton>
        <PokemonAutocomplete />
        <IconButton aria-label="Next">
          <ChevronRight />
        </IconButton>
      </Stack>
    </Container>
  );
}
