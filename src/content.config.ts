import { defineCollection, reference, z } from "astro:content"
import { file, glob } from 'astro/loaders';
import { Description } from "@headlessui/react";

const itemCollections = defineCollection({
    loader: file("./src/lib/itemCollections.json"),
    schema:
        ({ image }) => z.object({
            title: z.string(),
            description: reference("descriptions").optional(),
            carouselMode: z.string().optional(),
            images: z.array(z.object({
                title: z.string(),
                description: z.string(),
                imageRoute: image(),
            })),
            video: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                videoRoute: z.string().optional()
            }).optional()
        })
})

const descriptions = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/lib/textos" }),
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = { itemCollections, descriptions }