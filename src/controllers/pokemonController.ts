import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppError from "../error/AppError";
import Pokemon from "../models/Pokemon";
import { default as APIPokemon, default as APIPokemonService } from "../services/APIPokemon";
import pokemonValidation from "../validation/pokemonValidation";

class PokemonController {
    async create(request: Request, response: Response) {
        const data = request.body;
        await pokemonValidation.valid(data);

        const {
            idPokemon
        } = data;

        const pokemonRepository = getRepository(Pokemon);

        const communityAlreadyExists = await pokemonRepository.findOne({ idPokemon })

        if (communityAlreadyExists) {
            throw new AppError("pokemon already exists", 404);
        }

        const pokemon = pokemonRepository.create({
            idPokemon
        })



        const pokemonRegister = await pokemonRepository.save(pokemon);
        const pokemonProperties = await APIPokemon.getPokemon(idPokemon)
        return response.status(201).json({
            ...pokemonProperties,
            ref: pokemonRegister.id,
            isFavorite: true
        });

    }

    async show(request: Request, response: Response) {

        const { idPokemon } = request.params;
        await pokemonValidation.valid({ idPokemon: Number(idPokemon) });
        const pokemonRepository = getRepository(Pokemon);
        const pokemon = await pokemonRepository.findOne({
            idPokemon
        })

        const isFavorite = !!pokemon;
        const pokemonItem = await APIPokemon.getPokemon(idPokemon)

        return response.json({
            ref: pokemon?.id,
            isFavorite,
            ...pokemonItem
        });

    }
    async index(request: Request, response: Response) {
        const { limit, offset } = request.query;
        const pokemons = await APIPokemonService.getPokemons(
            {
                limit: Number(limit) || undefined,
                offset: Number(offset) || undefined
            })
        return response.json(pokemons)

    }
    async indexFavorites(request: Request, response: Response) {

        const pokemonRepository = getRepository(Pokemon);
        const pokemonsDocuments = await pokemonRepository.find({
            order: {
                created_at: "DESC"
            }
        });

        const pokemons = [];

        for (let i = 0; i < pokemonsDocuments.length; i++) {
            const { idPokemon } = pokemonsDocuments[i]
            const { id, image, name } = await APIPokemon.getPokemon(idPokemon)
            pokemons.push({
                id,
                image,
                name,
            })
        }
        return response.json(pokemons)
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        await pokemonValidation.id(id);

        const pokemonRepository = getRepository(Pokemon);
        const community = await pokemonRepository.findOne({
            where: { id }
        });

        if (!community) {
            throw new AppError("not found", 404);
        }

        await pokemonRepository.delete({ id });

        return response.sendStatus(204);

    }
}

export default new PokemonController();