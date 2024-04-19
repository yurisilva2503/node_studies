import { fastify } from "fastify";
import { databasePG } from "./db-postgres.js";
const server = fastify();
const db = new databasePG()

server.get("/videos", async (request, reply) => {
    const search = request.query.search
    const videos = await db.list(search)
    return reply.status(200).send(videos)
})

server.post("/videos", async (request, reply) => {
    const {title, description, duration} = request.body
    await db.create({
        title,
        description,
        duration,
    })
    return reply.status(201).send()
})

server.put("/videos/:id", async (request, reply) => {
    const id = request.params.id
    const { title, description, duration } = request.body
    await db.update(id, {
        title,
        description,
        duration
    })
    return reply.status(204).send()
})

server.delete("/videos/:id", async (request, reply) => {
    const id = request.params.id
    await db.delete(id)
    return reply.status(204).send()
})

server.listen({
    port: process.env.port ?? 3333
})