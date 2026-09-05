import { z } from 'zod';

export const symptomSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  duration: z.string().optional(),
  severity: z.string().optional(),
  frequency: z.string().optional(),
});

export const allergySchema = z.object({
  allergen: z.string().min(1, 'Allergen is required'),
  severity: z.string().optional(),
  reaction: z.string().optional(),
});

export const medicationSchema = z.object({
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
});

export const patientIntakeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().int().positive('Age must be a positive number'),
  sex: z.enum(['male', 'female', 'other']),
  symptoms: z.array(symptomSchema).default([]),
  conditions: z.array(z.string()).default([]),
  allergies: z.array(allergySchema).default([]),
  medications: z.array(medicationSchema).default([]),
  notes: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]).optional(),
});
