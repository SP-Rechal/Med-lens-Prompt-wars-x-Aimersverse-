import { SchemaType } from '@google/generative-ai';

export const extractionResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    patientName: { type: SchemaType.STRING, description: "Patient's name if present" },
    dateOfBirth: { type: SchemaType.STRING, description: "Patient's date of birth if present" },
    reportDate: { type: SchemaType.STRING, description: "Date of the report" },
    labResults: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          testName: { type: SchemaType.STRING },
          value: { type: SchemaType.NUMBER },
          valueString: { type: SchemaType.STRING, description: "String representation of the value if it's not a strict number" },
          unit: { type: SchemaType.STRING },
          referenceRange: { type: SchemaType.STRING, description: "The reference range EXACTLY as it appears in the text. DO NOT invent ranges." },
          flag: { type: SchemaType.STRING, description: "Any abnormality flag (e.g., High, Low, Abnormal)" },
          notes: { type: SchemaType.STRING, description: "Any specific notes related to this test" }
        },
        required: ["testName", "valueString"]
      }
    },
    observations: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "General clinical observations or findings"
    }
  },
  required: ["labResults", "observations"]
};

export const conflictResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      type: { type: SchemaType.STRING, description: "Type of conflict (e.g., allergy, medication, condition)" },
      description: { type: SchemaType.STRING, description: "Description of the conflict" },
      severity: { type: SchemaType.STRING, description: "Severity of the conflict (e.g., low, medium, high)" },
      intakeSource: { type: SchemaType.STRING },
      reportSource: { type: SchemaType.STRING }
    },
    required: ["type", "description", "severity"]
  }
};

export const clarificationResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      question: { type: SchemaType.STRING, description: "The clarification question" },
      reason: { type: SchemaType.STRING, description: "Why this question is being asked based on the context" },
      relatedTopic: { type: SchemaType.STRING, description: "The clinical topic this relates to (e.g., medication, symptom)" }
    },
    required: ["question", "reason"]
  }
};
