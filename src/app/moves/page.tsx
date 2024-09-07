import { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MovesDisplay from './MovesDisplay';

export default function MovesPage() {
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Moves
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <MovesDisplay />
      </Suspense>
    </Container>
  );
}
