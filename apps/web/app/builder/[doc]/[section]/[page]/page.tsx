import PageView from "./pageView";

type Props = {
  params: Promise<{ doc: string; section: string; page: string }>;
};

export default async function Page({ params }: Props) {
  const { doc, section, page } = await params;
  return <PageView docSlug={doc} sectionSlug={section} pageSlug={page} />;
}
