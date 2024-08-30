'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { usePokemonStore } from '@/hooks/useStore';
import { formatPokemonName } from '@/utils/string';

export default function PokemonAutocomplete({
  width,
}: {
  width?: string | number;
}) {
  const pokemon = usePokemonStore((state) => state.pokemon);
  const setPokemon = usePokemonStore((state) => state.setPokemon);
  const selected = usePokemonStore((state) => state.selected);
  const setSelected = usePokemonStore((state) => state.setSelected);
  const [value, setValue] = useState<{ label: string; number: number }>({
    label: '',
    number: 0,
  });
  const { isPending } = useQuery<{
    results: { name: string; url: string }[];
  }>({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setPokemon(data.results);
      return data.results;
    },
  });

  const options = useMemo(
    () =>
      pokemon.map(({ name }, index) => ({
        label: `${index + 1} - ${formatPokemonName(name)}`,
        number: index + 1,
      })) ?? [],
    [pokemon],
  );

  useEffect(() => {
    setValue(
      options[selected - 1] ?? {
        label: '',
        number: 0,
      },
    );
  }, [selected, options]);

  return (
    <Autocomplete
      value={value}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disableClearable
      options={options}
      isOptionEqualToValue={(option, value) => option.number === value?.number}
      getOptionKey={(option) => option.number}
      renderInput={(params) => <TextField {...params} />}
      sx={{ width }}
      loading={options.length === 0 && isPending}
      disabled={options.length === 0 && isPending}
      onChange={(event, value) => {
        setSelected(value?.number ?? 1);
      }}
    />
  );
}
