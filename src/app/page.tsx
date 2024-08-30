import Container from '@mui/material/Container';

import PokemonSelectBar from '@/components/PokemonSelectBar';

export default function Home() {
  return (
    <Container sx={{ pt: 4 }}>
      <PokemonSelectBar />
    </Container>
  );
}
