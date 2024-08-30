import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PokemonState {
  pokemon: { name: string; url: string }[];
  setPokemon: (pokemon: { name: string; url: string }[]) => void;
  selected: number;
  setSelected: (selected: number) => void;
  incrementSelected: () => void;
  decrementSelected: () => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set, get) => ({
      pokemon: [],
      setPokemon: (pokemon) => set({ pokemon }),
      selected: 1,
      setSelected: (selected) => {
        console.log('setSelected: ', selected);
        if (selected > get().pokemon.length) {
          set({ selected: 1 });
        } else {
          set({ selected });
        }
      },
      incrementSelected: () => {
        if (get().pokemon.length && get().selected < get().pokemon.length) {
          set((state) => ({ selected: state.selected + 1 }));
        }
      },
      decrementSelected: () => {
        if (get().selected > 1) {
          set((state) => ({ selected: state.selected - 1 }));
        }
      },
    }),
    { name: 'pokemon-storage' },
  ),
);
