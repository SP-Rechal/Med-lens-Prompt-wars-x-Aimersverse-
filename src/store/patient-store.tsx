"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";
import type { PatientIntake } from "@/types/patient";
import type { ExtractedReport } from "@/types/report";
import type { AnalysisResult, Conflict } from "@/types/analysis";

// ─── Patient Store Types ──────────────────────────────────────────────

export interface ReviewState {
  editedFields: Record<string, { originalValue: string; newValue: string; editedAt: string }>;
  resolvedConflicts: Record<string, { resolution: string; resolvedAt: string }>;
  verifiedSections: string[];
  answeredQuestions: Record<string, string>;
}

export interface PatientState {
  // Data
  patientIntake: PatientIntake | null;
  extractedReport: ExtractedReport | null;
  previousReport: ExtractedReport | null;
  analysisResult: AnalysisResult | null;
  reviewState: ReviewState;
  summary: string | null;
  rawText: string | null;
  previousRawText: string | null;
  isProcessing: boolean;

  // Actions
  setPatientIntake: (intake: PatientIntake) => void;
  setExtractedReport: (report: ExtractedReport) => void;
  setPreviousReport: (report: ExtractedReport | null) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setReviewState: (state: ReviewState) => void;
  setSummary: (summary: string) => void;
  setRawText: (text: string) => void;
  setPreviousRawText: (text: string | null) => void;
  setIsProcessing: (processing: boolean) => void;

  // Review actions
  editField: (fieldName: string, originalValue: string, newValue: string) => void;
  resolveConflict: (conflictId: string, resolution: string) => void;
  verifySection: (sectionName: string) => void;
  unverifySection: (sectionName: string) => void;
  answerQuestion: (questionId: string, answer: string) => void;

  // Reset
  resetStore: () => void;
}

const defaultReviewState: ReviewState = {
  editedFields: {},
  resolvedConflicts: {},
  verifiedSections: [],
  answeredQuestions: {},
};

export type PatientStore = ReturnType<typeof createPatientStore>;

export const createPatientStore = () => {
  return createStore<PatientState>()((set) => ({
    // Initial state
    patientIntake: null,
    extractedReport: null,
    previousReport: null,
    analysisResult: null,
    reviewState: defaultReviewState,
    summary: null,
    rawText: null,
    previousRawText: null,
    isProcessing: false,

    // Setters
    setPatientIntake: (intake) => set({ patientIntake: intake }),
    setExtractedReport: (report) => set({ extractedReport: report }),
    setPreviousReport: (report) => set({ previousReport: report }),
    setAnalysisResult: (result) => set({ analysisResult: result }),
    setReviewState: (state) => set({ reviewState: state }),
    setSummary: (summary) => set({ summary }),
    setRawText: (text) => set({ rawText: text }),
    setPreviousRawText: (text) => set({ previousRawText: text }),
    setIsProcessing: (processing) => set({ isProcessing: processing }),

    // Review actions
    editField: (fieldName, originalValue, newValue) =>
      set((state) => ({
        reviewState: {
          ...state.reviewState,
          editedFields: {
            ...state.reviewState.editedFields,
            [fieldName]: { originalValue, newValue, editedAt: new Date().toISOString() },
          },
        },
      })),

    resolveConflict: (conflictId, resolution) =>
      set((state) => ({
        reviewState: {
          ...state.reviewState,
          resolvedConflicts: {
            ...state.reviewState.resolvedConflicts,
            [conflictId]: { resolution, resolvedAt: new Date().toISOString() },
          },
        },
      })),

    verifySection: (sectionName) =>
      set((state) => ({
        reviewState: {
          ...state.reviewState,
          verifiedSections: state.reviewState.verifiedSections.includes(sectionName)
            ? state.reviewState.verifiedSections
            : [...state.reviewState.verifiedSections, sectionName],
        },
      })),

    unverifySection: (sectionName) =>
      set((state) => ({
        reviewState: {
          ...state.reviewState,
          verifiedSections: state.reviewState.verifiedSections.filter((s) => s !== sectionName),
        },
      })),

    answerQuestion: (questionId, answer) =>
      set((state) => ({
        reviewState: {
          ...state.reviewState,
          answeredQuestions: {
            ...state.reviewState.answeredQuestions,
            [questionId]: answer,
          },
        },
      })),

    // Reset everything
    resetStore: () =>
      set({
        patientIntake: null,
        extractedReport: null,
        previousReport: null,
        analysisResult: null,
        reviewState: defaultReviewState,
        summary: null,
        rawText: null,
        previousRawText: null,
        isProcessing: false,
      }),
  }));
};

// ─── React Context Provider ───────────────────────────────────────────

const PatientStoreContext = createContext<PatientStore | null>(null);

export function PatientStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<PatientStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createPatientStore();
  }

  return (
    <PatientStoreContext.Provider value={storeRef.current}>
      {children}
    </PatientStoreContext.Provider>
  );
}

export function usePatientStore<T>(selector: (state: PatientState) => T): T {
  const store = useContext(PatientStoreContext);
  if (!store) {
    throw new Error("usePatientStore must be used within PatientStoreProvider");
  }
  return useStore(store, selector);
}
