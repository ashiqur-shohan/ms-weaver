import type { Metadata } from "next";
import { aboutPage } from "@/lib/mock/about";
import { AboutHero } from "@/components/about/AboutHero";
import { AshfiaPortrait } from "@/components/about/AshfiaPortrait";
import { CraftPhilosophy } from "@/components/about/CraftPhilosophy";
import { MaterialsAndOrigin } from "@/components/about/MaterialsAndOrigin";
import { AtelierGallery } from "@/components/about/AtelierGallery";
import { CallToShop } from "@/components/about/CallToShop";

export const metadata: Metadata = {
  title: "Our Story — Ms Weaver",
  description:
    "Ashfia Khatun's atelier in Dhaka. A slow practice of inherited hands — cotton, linen, and merino worked stitch by stitch for those who believe objects should be chosen slowly.",
  openGraph: {
    images: [aboutPage.hero.image.url],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero data={aboutPage.hero} />
      <AshfiaPortrait data={aboutPage.portrait} />
      <CraftPhilosophy data={aboutPage.philosophy} />
      <MaterialsAndOrigin data={aboutPage.materials} />
      <AtelierGallery images={aboutPage.gallery} />
      <CallToShop />
    </>
  );
}
