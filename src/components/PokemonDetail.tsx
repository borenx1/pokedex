import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

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
            src={data.sprites.front_default}
            alt={data.name}
            height={300}
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
        </>
      ) : (
        <>
          <Skeleton variant="rounded" width={400} height={300} />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="50%" height={32} />
        </>
      )}
    </Box>
  );
}
