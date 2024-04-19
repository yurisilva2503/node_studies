import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class databasePG{
    async list(search){
        let videos = ''

        if(search){
            videos = await sql`select * from videos where titulo ilike ${search}`
        }else{
            videos = await sql`select * from videos`
        }
        return videos
    }

    async create(video){
        const { title, description, duration } = video
        const id = randomUUID()
        const insert_video = await sql`insert into videos (video_id, titulo, descricao, duracao) values (${id}, ${title}, ${description}, ${duration})`
        return insert_video
    }

    async update(id, video){
        const { title, description, duration } = video
        const update_video = sql`update videos set titulo = ${title}, descricao = ${description}, duracao = ${duration} where video_id = ${id}`
        return update_video
    }
    
    async delete(id){
        const delete_video = await sql`delete from videos where video_id = ${id}`
        return delete_video 
    }
}