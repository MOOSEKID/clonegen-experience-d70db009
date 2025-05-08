
import * as z from 'zod';

export const gatewayFormSchema = z.object({
  name: z.string().min(1, { message: 'Gateway name is required' }),
  provider: z.string().min(1, { message: 'Provider name is required' }),
  fee: z.string().min(1, { message: 'Transaction fee information is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  isEnabled: z.boolean().default(true),
  supportedCards: z.array(z.string()).optional(),
  apiKey: z.string().optional(),
  secretKey: z.string().optional(),
  webhookUrl: z.string().optional(),
  webhookSecret: z.string().optional(),
  testMode: z.boolean().default(false),
  customFields: z.record(z.string()).optional(),
});

export type GatewayFormValues = z.infer<typeof gatewayFormSchema>;
