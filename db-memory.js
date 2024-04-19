import { randomUUID } from 'node:crypto'

export class database{
    #videos = new Map()

    list(search){
        return Array.from(this.#videos.entries()).map(videos => {
            return {
                id: videos[0],
                ...videos[1]
            }
        })
        .filter(video => {
            if(search){
                return video.title.toLowerCase().includes(search.toLowerCase())
            }
            return true
        })
    }

    create(video){
        const id = randomUUID()
        this.#videos.set(id, video)
    }

    update(id, video)   {
        this.#videos.set(id, video)
    }
    
    delete(id){
        this.#videos.delete(id)
    }
}