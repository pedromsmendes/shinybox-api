import * as yup from 'yup';

import type { Pokemon, PokemonDex } from '@prisma/client';

type PokemonWithDexes = Pokemon & {
  dexes: PokemonDex[];
};

type SchemaPokemon = Partial<Record<keyof PokemonWithDexes, any>>;
type SchemaPokemonDex = Partial<Record<keyof PokemonDex, any>>;

export const pokemonCreateSchema = yup.object().shape<SchemaPokemon>({
  name: yup.string().required(),
  dexes: yup.array().of(yup.object().shape<SchemaPokemonDex>({
    dexId: yup.string().uuid().required(),
    name: yup.string().required(),
    number: yup.number().required(),
  })).required(),
});

export const pokemonUpdateSchema = yup.object().shape<SchemaPokemon>({
  name: yup.string().notRequired(),
  dexes: yup.array().of(yup.object().shape<SchemaPokemonDex>({
    dexId: yup.string().uuid().required(),
    name: yup.string().required(),
    number: yup.number().required(),
  })).notRequired(),
});
