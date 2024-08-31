import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';

import { formatPokemonName } from '@/utils/string';

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
          <Typography variant="h6">{formatPokemonName(data.name)}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {data.types.map(
              (
                type: { type: { name: string; url: string } },
                index: number,
              ) => {
                const typeId = type.type.url.split('/').slice(-2)[0];
                return (
                  <img
                    key={index}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${typeId}.png`}
                    alt={type.type.name}
                    height={20}
                    loading="lazy"
                  />
                );
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
