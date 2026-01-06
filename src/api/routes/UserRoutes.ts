import fastify, { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { string } from "zod";
import { userType } from "../../domain/enums/userType";

export async function userRoutes(app: FastifyInstance){
    const usercontroller = new UserController();

    app.post(
        "/users",
        {
            schema: {
                body:{
                    type: "object",
                    required: ["name", "type", "address"],
                    properties: {
                        name: {type: "string", minLength: 3},
                        type: {
                            type: "string",
                            enum: Object.values(userType)
                        },
                        address: {type: "string", minLength: 3}
                    }
                }
            }
        },
        usercontroller.createUser.bind(usercontroller)
    );   
}