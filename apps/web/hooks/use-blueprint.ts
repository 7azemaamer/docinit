"use client";

import { useState, useEffect } from "react";
import { getBlueprintBySlug } from "@/lib/mock-blueprint";
import type { Blueprint } from "@docinit/core";

export function useBlueprint(slug: string) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage first
    const stored = sessionStorage.getItem("generatedBlueprint");
    if (stored) {
      const bp = JSON.parse(stored) as Blueprint;
      if (bp.slug === slug) {
        setBlueprint(bp);
        setLoading(false);
        return;
      }
    }
    // Fall back to mock data
    setBlueprint(getBlueprintBySlug(slug) ?? null);
    setLoading(false);
  }, [slug]);

  return { blueprint, loading };
}
