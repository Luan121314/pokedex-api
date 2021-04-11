import * as yup from 'yup';
import Generic from './Generic';

interface PokemonProps {
    idPokemon: number
}

class PokemonValidation extends Generic {

    async valid(data: PokemonProps) {
        const schema = yup.object().shape({
            idPokemon: yup.number().required(),
        })

        await schema.validate(data, {
            abortEarly: false
        })
    }
}

export default new PokemonValidation();