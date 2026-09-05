"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore, useStore } from "zustand";

// ─── Workflow Store Types ─────────────────────────────────────────────

export type WorkflowStep = "intake" | "upload" | "record" | "review" | "summary";

const STEP_ORDER: WorkflowStep[] = ["intake", "upload", "record", "review", "summary"];

export const STEP_LABELS: Record<WorkflowStep, string> = {
  intake: "Patient Intake",
  upload: "Upload Report",
  record: "Structured Record",
  review: "Human Review",
  summary: "Summary",
};

export interface WorkflowState {
  currentStep: WorkflowStep;
  completedSteps: WorkflowStep[];

  setStep: (step: WorkflowStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: WorkflowStep) => void;
  isStepComplete: (step: WorkflowStep) => boolean;
  isStepAccessible: (step: WorkflowStep) => boolean;
  resetWorkflow: () => void;
}

export type WorkflowStore = ReturnType<typeof createWorkflowStore>;

export const createWorkflowStore = () => {
  return createStore<WorkflowState>()((set, get) => ({
    currentStep: "intake",
    completedSteps: [],

    setStep: (step) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep } = get();
      const currentIndex = STEP_ORDER.indexOf(currentStep);
      if (currentIndex < STEP_ORDER.length - 1) {
        set({ currentStep: STEP_ORDER[currentIndex + 1] });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      const currentIndex = STEP_ORDER.indexOf(currentStep);
      if (currentIndex > 0) {
        set({ currentStep: STEP_ORDER[currentIndex - 1] });
      }
    },

    markStepComplete: (step) =>
      set((state) => ({
        completedSteps: state.completedSteps.includes(step)
          ? state.completedSteps
          : [...state.completedSteps, step],
      })),

    isStepComplete: (step) => get().completedSteps.includes(step),

    isStepAccessible: (step) => {
      const stepIndex = STEP_ORDER.indexOf(step);
      if (stepIndex === 0) return true;
      // Can access if the previous step is complete
      const prevStep = STEP_ORDER[stepIndex - 1];
      return get().completedSteps.includes(prevStep);
    },

    resetWorkflow: () =>
      set({
        currentStep: "intake",
        completedSteps: [],
      }),
  }));
};

// ─── React Context Provider ───────────────────────────────────────────

const WorkflowStoreContext = createContext<WorkflowStore | null>(null);

export function WorkflowStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<WorkflowStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createWorkflowStore();
  }

  return (
    <WorkflowStoreContext.Provider value={storeRef.current}>
      {children}
    </WorkflowStoreContext.Provider>
  );
}

export function useWorkflowStore<T>(selector: (state: WorkflowState) => T): T {
  const store = useContext(WorkflowStoreContext);
  if (!store) {
    throw new Error("useWorkflowStore must be used within WorkflowStoreProvider");
  }
  return useStore(store, selector);
}
