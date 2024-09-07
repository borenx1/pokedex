import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { formatPokemonName } from '@/utils/string';
import TypeImage from '@/components/TypeImage';

export default function PokemonDetail({
  id,
  url,
}: {
  id: number;
  url: string;
}) {
  const { data, isPending } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {data && !isPending ? (
        <>
          <img
            src={
              data.sprites.other?.['official-artwork']?.front_default ??
              data.sprites.front_default
            }
            alt={data.name}
            height={240}
            loading="lazy"
          />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="h6">{formatPokemonName(data.name)}</Typography>
            {data.cries.latest && (
              <IconButton
                size="small"
                onClick={() => {
                  const audio = new Audio(data.cries.latest);
                  audio.volume = 0.1;
                  audio.play();
                }}
              >
                <VolumeUp />
              </IconButton>
            )}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {data.types.map(
              (
                type: { type: { name: string; url: string } },
                index: number,
              ) => {
                return <TypeImage key={index} type={type.type} height={20} />;
              },
            )}
          </Stack>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2 }}
            columnSpacing={4}
            sx={{ mt: 4, maxWidth: 440 }}
          >
            {data.stats.map(
              (stat: { base_stat: number; stat: { name: string } }) => (
                <Grid
                  key={stat.stat.name}
                  size={{ xs: 12, sm: 6 }}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="subtitle1">
                    {formatPokemonName(stat.stat.name)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {stat.base_stat}
                  </Typography>
                </Grid>
              ),
            )}
          </Grid>
        </>
      ) : (
        <>
          <Skeleton variant="rounded" width={300} height={240} />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="50%" height={32} />
          <Skeleton variant="rounded" width={400} height={160} />
        </>
      )}
    </Box>
  );
}
