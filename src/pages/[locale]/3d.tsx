"use client";

import Layout1 from "@/layout/layout1";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { Canvas } from "@react-three/fiber";
import { Kalygo3dModel } from "@/components/three/model";
import { OrbitControls } from "@react-three/drei";

const getStaticProps = makeStaticProps([
  "feedback-page",
  "seo",
  "navbar",
  "common",
  "forms",
  "error",
  "info",
  "toast-messages",
]);
export { getStaticPaths, getStaticProps };

export default function Feedback() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("seo:3d-page-seo-title")}</title>
        <meta name="description" content={t("seo:3d-page-seo-description")!} />
      </Head>
      <Layout1 disableStickyTopNav>
        <div style={{ width: "96vw", height: "100vh", margin: "0 auto" }}>
          <Canvas
            gl={{ preserveDrawingBuffer: true }}
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <Kalygo3dModel />
            <directionalLight
              color="white"
              position={[0, 0, 10]}
              intensity={2.5}
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </Layout1>
    </>
  );
}
