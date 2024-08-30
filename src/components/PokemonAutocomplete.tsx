'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { formatPokemonName } from '@/utils/string';

export default function PokemonAutocomplete() {
  const { data, isPending } = useQuery<{
    results: { name: string; url: string }[];
  }>({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
      );
      return res.json();
    },
  });
  const options =
    data?.results.map(({ name }, index) => ({
      label: `${index + 1} - ${formatPokemonName(name)}`,
      number: index + 1,
    })) ?? [];

  return (
    <Autocomplete
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} />}
      sx={{ width: 300 }}
      loading={isPending}
      disabled={isPending}
    />
  );
}
