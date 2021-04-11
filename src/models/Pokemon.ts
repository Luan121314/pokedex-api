import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pokemon")
class Pokemon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idPokemon: string;

    @CreateDateColumn({ type: "timestamp", default: () => "now()" })
    created_at: Date;

}

export default Pokemon;