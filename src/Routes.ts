import { Router } from "express";
import pokemonController from "./controllers/pokemonController";

const routes = Router();
//pokemon
routes.post("/pokemons", pokemonController.create);
routes.get("/pokemons/:idPokemon", pokemonController.show);
routes.get("/pokemons", pokemonController.index);
routes.get("/pokemons/u/favorites", pokemonController.indexFavorites);
routes.delete("/pokemons/:id", pokemonController.delete);


export default routes;