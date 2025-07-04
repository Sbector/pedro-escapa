import { defineCollection, z } from "astro:content";


const bidimensional = defineCollection({
    schema: z.object({
        title: z.string(),
        img: z.string(),
        imgUrl: z.string().url(),
        description: z.string(),
        order: z.number(),
    })
})

export const collections = { bidimensional }