"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentTextIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  onboardingQuestions,
  generateBlueprint,
  type OnboardingAnswers,
} from "@docinit/core";

type ProjectData = {
  name: string;
  description: string;
};

function getProjectData(): ProjectData | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("newProject");
  if (!stored) return null;
  return JSON.parse(stored) as ProjectData;
}

export default function QuestionsPage() {
  const router = useRouter();
  const [projectData] = useState<ProjectData | null>(() => getProjectData());
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Redirect if no project data
  if (!projectData) {
    if (typeof window !== "undefined") {
      router.push("/new");
    }
    return null;
  }

  const currentQuestion = onboardingQuestions[currentStep];
  const isLastQuestion = currentStep === onboardingQuestions.length - 1;

  const handleAnswer = (questionId: string, value: string) => {
    if (currentQuestion.type === "single") {
      setAnswers({ ...answers, [questionId]: value });
    } else {
      const current = (answers[questionId] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [questionId]: updated });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const blueprintAnswers: OnboardingAnswers = {
        projectName: projectData.name,
        projectDescription: projectData.description!,
        projectType: answers.projectType as string,
        features: answers.features as string[],
        audience: answers.audience as string,
      };

      const blueprint = generateBlueprint(blueprintAnswers);

      sessionStorage.setItem("generatedBlueprint", JSON.stringify(blueprint));

      router.push(`/builder/${blueprint.slug}`);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/new");
    }
  };

  const canContinue =
    currentQuestion?.type === "single"
      ? !!answers[currentQuestion.id]
      : (answers[currentQuestion?.id] as string[])?.length > 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span className="font-semibold">Docinit</span>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-foreground">
              {projectData.name}
            </h1>
            <span className="text-sm text-secondary">
              Question {currentStep + 1} of {onboardingQuestions.length}
            </span>
          </div>
          <p className="text-lg text-secondary">
            These help us create the right structure for your docs.
          </p>
        </div>

        {/* Progress */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-300"
            style={{
              width: `${
                ((currentStep + 1) / onboardingQuestions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected =
                currentQuestion.type === "single"
                  ? answers[currentQuestion.id] === option.value
                  : (answers[currentQuestion.id] as string[])?.includes(
                      option.value
                    );

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-foreground bg-muted"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-foreground" : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-3 w-3 rounded-full bg-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-secondary mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canContinue}
            className="flex-1 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? "Generate Blueprint" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
