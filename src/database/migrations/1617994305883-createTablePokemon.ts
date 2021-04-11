import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTablePokemon1617994305883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Pokemon",
            columns:[
                {
                    name:"id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name:"idPokemon",
                    type: "int"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
