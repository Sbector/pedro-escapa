import { defineCollection, reference, z } from "astro:content"
import { glob, file } from 'astro/loaders';

const categoria = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/lib/categoria' }),
    schema:
        z.object({
            title: z.string(),
            description: z.string().optional(),
            itemCollection: reference("itemCollections")
        }),
});

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

export const collections = { categoria, itemCollections }