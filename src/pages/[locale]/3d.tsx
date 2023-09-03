"use client";

import { useForm } from "react-hook-form";
import Layout1 from "@/layout/layout1";
import Head from "next/head";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { Canvas, useFrame } from "@react-three/fiber";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { navigatorLangDetector } from "@/lib/languageDetector";
import { useRef, useState } from "react";
import { Vector3 } from "three";

import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Kalygo3dModel } from "@/components/three/model";

import { Stats, OrbitControls } from "@react-three/drei";

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

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Feedback() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { feedback } = data;
      console.log("data", data);

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/feedback/general`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          feedback,
        },
      };

      let resp = await axios(config);

      console.log(resp);

      infoToast(t("toast-messages:the-feedback-is-appreciated"));

      // const detectedLng = languageDetector.detect();
      const detectedLng = navigatorLangDetector();

      router.push(`/${detectedLng}/`);
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <Head>
        <title>{t("seo:feedback-page-seo-title")}</title>
        <meta
          name="description"
          content={t("seo:feedback-page-seo-meta-description")!}
        />
      </Head>
      <Layout1 disableStickyTopNav>
        <div style={{ width: "100vw", height: "100vh" }}>
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
