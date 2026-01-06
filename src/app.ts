import Fastify from "fastify";
import { userRoutes } from "./api/routes/UserRoutes";

const app = Fastify({ logger: true });

app.register(userRoutes, { prefix: "/api" });

export default app;
