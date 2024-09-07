'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { formatPokemonMove } from '@/utils/string';
import MoveDialog from '@/components/MoveDialog';

export default function MovesGrid({
  moves,
}: {
  moves: { name: string; url: string }[];
}) {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMove, setSelectedMove] = useState<{
    name: string;
    url: string;
  }>();
  const movesData = useMemo(
    () =>
      moves.map((move) => ({
        ...move,
        id: move.url.split('/').slice(-2)[0]!,
        label: formatPokemonMove(move.name),
      })),
    [moves],
  );
  const filteredMoves = useMemo(() => {
    if (!search) {
      return movesData;
    }
    return movesData.filter((move) =>
      move.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [movesData, search]);

  const handleClick = (move: { name: string; url: string }) => {
    setSelectedMove(move);
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        sx={{ width: '100%', maxWidth: 600, mb: 4 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredMoves.map((move) => (
          <Grid key={move.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              onClick={() => handleClick(move)}
            >
              {move.label}
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
    </Box>
  );
}
