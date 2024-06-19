import { z } from "zod";

export const createApiKeySchema = z
  .object({
    projectId: z.string(),
  })
  .strict();
