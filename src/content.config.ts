import { defineCollection, reference, z } from "astro:content"
import { file } from 'astro/loaders';


const itemCollections = defineCollection({
    loader: file("./src/lib/itemCollections.json"),
    schema:
        ({ image }) => z.object({
            title: z.string(),
            description: z.string(),
            images: z.array(z.object({
                title: z.string(),
                description: z.string(),
                imageRoute: image(),
            })),
        })
})

export const collections = { itemCollections }