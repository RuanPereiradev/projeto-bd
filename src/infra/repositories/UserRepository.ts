import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { Result } from "@/env/Result";
import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { db } from "../config/db";

export class UserRepository implements IUserRepository{
   async create(user: User): Promise<   Result<User>> {
        const [result] : any = await db.query(
            `INSERT INTO Usuario (nome, tipo, endereco, ativo)
            VALUES (?, ?, ?, ?)`,
            [
                user.name,
                user.type,
                user.address, 
                user.isActive? 1:0
            ]
        );
        const createdUser = new User(
            user.name,
            user.type,
            user.address,
            result.insertId
        );

        return Result.ok(createdUser);
    }
    async findById(id: number): Promise<Result<User | null>> {
       try {
           const [rows]: any = await db.query(
              `
            SELECT id_usuario, nome, tipo, endereco, ativo
            FROM Usuario
            WHERE id_usuario = ? AND ativo = 1
            `,
            [id]
           );

           if(rows.length === 0){
            return Result.ok(null)
           }

           const row  = rows[0]
           
           const user = new User(
            row.name,
            row.type,
            row.address ?? "",
            row.userId
           );

           return Result.ok(user)

       } catch (error: any) {
        console.error("Erro ao buscar usuário:", error);
        return Result.fail("Erro ao acessar o banco de dados");
       }

    }
    findAll(): Promise<Result<User[]>> {
        throw new Error("Method not implemented.");
    }
    async update(user: User): Promise<Result<User>> {
        try {
            if(!user.userId){
            return Result.fail("Usuários sem ID não pode ser atualizado");
            }
            await db.query(
                  `
                UPDATE Usuario
                SET nome = ?,
                    tipo = ?,
                    endereco = ?,
                    ativo = ?
                WHERE id_usuario = ?
                `,
                [
                    user.name,
                    user.type,
                    user.address,
                    user.isActive? 1:0,
                    user.userId
                ]
            )
            return Result.ok(user)
        } catch (error:any) {
            return Result.fail("Erro desconhecido no update")
        }
    }
    async softDelete(id: number): Promise<Result<void>> {
        try {
            if(!id){
                return Result.fail("Necessário informar id")
            }
            await db.query(
                `UPDATE Usuario
                SET ativo = 0 
                WHERE id_usuario = ?
                `,
                [id]
            );
            return Result.ok()
        } catch (error:any) {
            return Result.fail("Erro desconhecido no soft delete")
        }
    }
    
}