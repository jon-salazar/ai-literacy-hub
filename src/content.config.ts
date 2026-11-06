import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const demoSchema = z.object({
  versionALabel: z.string(),
  versionAText: z.string(),
  versionBLabel: z.string(),
  versionBText: z.string(),
  explanation: z.string(),
});

const labSchema = z.object({
  scenario: z.string(),
  instructions: z.string(),
  useTaskContextCanvas: z.boolean().default(false),
});

const moduleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  phase: z.string(),
  order: z.number().int().positive(),
  duration: z.string(),
  status: z.enum(["published", "draft", "coming-soon"]),
  objectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).optional(),
  forms: z.string().optional(),
  introduction: z.string().optional(),
  keyMessage: z.string().optional(),
  demo: demoSchema.optional(),
  lab: labSchema.optional(),
  reflectionPrompts: z.array(z.string()).optional(),
  completionMessage: z.string().optional(),
});

const modules = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/modules" }),
  schema: moduleSchema.superRefine((data, ctx) => {
    if (data.status !== "published") return;
    const requiredForPublished: Array<keyof typeof data> = [
      "introduction",
      "keyMessage",
      "demo",
      "lab",
      "reflectionPrompts",
      "completionMessage",
    ];
    for (const field of requiredForPublished) {
      if (data[field] === undefined) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `"${field}" é obrigatório para módulos com status "published".`,
        });
      }
    }
    if (data.objectives.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["objectives"],
        message: `"objectives" não pode ser vazio para módulos com status "published".`,
      });
    }
  }),
});

export const collections = { modules };
