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

const lensTipsSchema = z.array(z.string().min(1)).min(1).max(5);

/**
 * Lentes por papel (Role Lenses): como o conceito do módulo se aplica a cada
 * função. Todas as chaves são opcionais; o campo inteiro também é opcional.
 */
const roleLensesSchema = z
  .object({
    dev: lensTipsSchema.optional(),
    qa: lensTipsSchema.optional(),
    po: lensTipsSchema.optional(),
    tl: lensTipsSchema.optional(),
  })
  .strict();

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
  roleLenses: roleLensesSchema.optional(),
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

const radar = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/radar" }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    type: z.enum(["conceito", "pratica", "ferramenta", "tendencia"]),
    tags: z.array(z.string().min(1)).default([]),
    example: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { modules, radar };
