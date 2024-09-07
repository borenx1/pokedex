'use client';

import { useQuery } from '@tanstack/react-query';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { formatPokemonMove } from '@/utils/string';
import TypeImage from '@/components/TypeImage';

export default function MoveDialog({
  url,
  open,
  onClose,
}: {
  url: string;
  open: boolean;
  onClose: () => void;
}) {
  const { data, isPending } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      {data && !isPending ? (
        <>
          <DialogTitle>{formatPokemonMove(data.name)}</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">Type:</Typography>
              <TypeImage type={data.type} height={20} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Damage class:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.damage_class.name.toUpperCase()}
              </Typography>
            </Box>
            {data.power != null && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Power:</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {data.power}
                </Typography>
              </Box>
            )}
            {data.accuracy != null && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Accuracy:</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {data.accuracy}
                </Typography>
              </Box>
            )}
            {!!data.priority && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Priority:</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {data.priority}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">PP:</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                {data.pp}
              </Typography>
            </Box>
            {!!data?.effect_entries?.length && (
              <Box>
                <Typography variant="subtitle1">Effect:</Typography>
                <Typography variant="body1">
                  {data.effect_entries[0].effect}
                </Typography>
              </Box>
            )}
          </DialogContent>
        </>
      ) : (
        <DialogContent>
          <Skeleton variant="text" width="50%" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={120} />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
