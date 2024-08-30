'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function PokemonAutocomplete() {
  return (
    <Autocomplete
      disablePortal
      options={[]}
      renderInput={(params) => <TextField {...params} />}
      sx={{ width: 300 }}
    />
  );
}
