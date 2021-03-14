import axios from "axios";
import { pokemonApi } from "../../../core/constants";
import { AxiosPokemonRequest } from "./types";

export const pokemonsUrl = `${pokemonApi}pokemon`;

export const getPokemonsz = async ({
  queryKey: [url, limit = 100, offset = 0],
}: any) => {
  const { data } = await axios.get<AxiosPokemonRequest>(url, {
    params: {
      limit,
      offset,
    },
  });
  const allPokemons = await axios.all(
    data?.results.map(({ url }: { url: string }) => axios.get(url))
  );

  return {
    count: data.count,
    pokemons: allPokemons.map(({ data }: any) => ({ ...data })),
  };
};
