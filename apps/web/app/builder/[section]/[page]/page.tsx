import { mockBlueprint } from "@/lib/mock-blueprint";
import PageView from "./pageView";

export default function Page({
  params,
}: {
  params: { section: string; page: string };
}) {
  const { section, page } = params;

  let pageData = mockBlueprint.sections
    .find((sec) => sec.slug === section)
    ?.pages.find((pag) => pag.slug === page);

  if (!pageData) {
    pageData = {
      title: "Dump",
      content: "dump",
      id: "dump",
      purpose: "good",
      slug: "dump",
      status: "draft",
    };
  }

  return <PageView page={pageData} />;
}
