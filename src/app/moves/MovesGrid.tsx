'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import { formatPokemonMove } from '@/utils/string';
import MoveDialog from '@/components/MoveDialog';

export default function MovesGrid({
  moves,
}: {
  moves: { name: string; url: string }[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMove, setSelectedMove] = useState<{
    name: string;
    url: string;
  }>();

  const handleClick = (move: { name: string; url: string }) => {
    setSelectedMove(move);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        {moves.map((move) => (
          <Grid key={move.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              onClick={() => handleClick(move)}
            >
              {formatPokemonMove(move.name)}
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedMove && (
        <MoveDialog
          url={selectedMove.url}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}
