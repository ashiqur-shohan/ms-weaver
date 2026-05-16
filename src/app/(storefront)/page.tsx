import { HomePageSections } from "@/components/home/HomePageSections";
import { homePage } from "@/lib/mock/home";

export const metadata = {
  title: "Ms Weaver — Handwoven Elegance",
  description:
    "Custom hand-knitted crochet by Ashfia Khatun. Made-to-order pieces in the spirit of quiet luxury.",
};

export default function HomePage() {
  return <HomePageSections sections={homePage} />;
}
