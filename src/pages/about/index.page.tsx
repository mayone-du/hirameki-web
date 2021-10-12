import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";

const AboutIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="このサービスについて" />
      <div>
        <h1 className="py-8 text-3xl font-bold text-center">このサービスについて</h1>
      </div>
    </>
  );
};

export default AboutIndexPage;

AboutIndexPage.getLayout = Layout;
