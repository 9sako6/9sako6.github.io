import { Layout } from "../components/ui/Layout";
import { MarkdownWrapper } from "../components/ui/MarkdownWrapper";
import AboutContent from "@/components/features/contents/about.mdx";

const AboutPage = () => (
  <Layout>
    <MarkdownWrapper>
      <AboutContent />
    </MarkdownWrapper>
  </Layout>
);

export default AboutPage;
