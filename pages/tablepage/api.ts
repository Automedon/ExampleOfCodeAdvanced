import axios from "axios";
import { pokemonApi } from "../../core/constants";

export const getPokemonsz = async () => {
  const { data } = await axios.get(`${pokemonApi}pokemon`, {
    params: {
      limit: 5,
      offset: 0,
    },
  });
  const allPokemons = await axios.all(
    data?.results.map(({ url }: { url: string }) => axios.get(url))
  );
  return allPokemons.map(({ data }: any) => ({ ...data }));
};
