import { getBlueprintBySlug } from "@/lib/mock-blueprint";
import PageView from "./pageView";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ doc: string; section: string; page: string }>;
}) {
  const { doc, section, page } = await params;

  const blueprint = getBlueprintBySlug(doc);
  if (!blueprint) {
    notFound();
  }

  const pageData = blueprint.sections
    .find((sec) => sec.slug === section)
    ?.pages.find((pag) => pag.slug === page);

  if (!pageData) {
    notFound();
  }

  return <PageView page={pageData} />;
}
