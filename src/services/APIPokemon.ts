import axios, { AxiosInstance } from 'axios'

interface PokemonAPIProps {
    results: Array<PokemonItemProps>
}

interface PokemonItemProps {
    name: string,
    url: string
}

interface ImagePokemonProps {
    sprites: {
        front_default: string
    }
}

interface getPokemonProps {
    id: number,
    name: string,
    height: number,
    weight: number,
    image:string,
    base_experience: string,
    abilities: Array<{
        ability: {
            name: "blaze"
        }
    }>
}

interface responsePokemonProps {
    name: string,
    id: number,
    image: string
}
interface ParamsGetPokemonsPrps{
    limit?:number,
    offset?: number
}

class APIPokemon {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "https://pokeapi.co/api/v2",
        })
    }

    async getPokemons({limit, offset}:ParamsGetPokemonsPrps) {
        limit ===null? 20 : limit
        offset ===null? 0 : offset
        const response = await this.api.get<PokemonAPIProps>(`pokemon?offset=${offset}&limit=${limit}`);
        const { results } = response.data;
        const pokemons = this.serializePokemons(results)
        return pokemons
    }


    private async getImage(pokemonRef: string | number) {
        const { data } = await this.api.get<ImagePokemonProps>(`pokemon/${pokemonRef}`)
        return data.sprites.front_default || ""
    }

    async getPokemon(pokemonRef: string | number) {
        const { data } = await this.api.get<getPokemonProps>(`pokemon/${pokemonRef}`);
        const { base_experience, height, weight, abilities, id, name } = data
        const image = await this.getImage(pokemonRef);
        const abilitiesSerialized = abilities.map(ability => ability.ability.name)
        return {
            id,
            name,
            image,
            height,
            weight,
            base_experience,
            abilities: abilitiesSerialized
        }

    }

    private async serializePokemons(pokemons: PokemonItemProps[]) {
        let pokemonSerialized: responsePokemonProps[] = []
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i]
            const { name, url } = pokemon;
            const arraySplit = url.split("/").filter(item => Number(item));
            const id = arraySplit[0];
            const image = await this.getImage(Number(id))
            pokemonSerialized.push({
                id: Number(id),
                name: name,
                image
            })
        }
        return pokemonSerialized;
    }

}

export default new APIPokemon()