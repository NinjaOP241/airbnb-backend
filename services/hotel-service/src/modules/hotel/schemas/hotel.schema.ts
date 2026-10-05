import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  address: z.string().min(1, "Hotel address is required"),
  location: z.string().min(1, "Hotel location is required"),
  rating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().int().min(0).optional(),
});

export const updateHotelSchema = createHotelSchema.partial();

export type CreateHotelDTO = z.infer<typeof createHotelSchema>;

export type UpdateHotelDTO = z.infer<typeof updateHotelSchema>;
