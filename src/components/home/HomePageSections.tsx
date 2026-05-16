import type { HomeSection } from "@/lib/mock/home";
import { Hero } from "./Hero";
import { FeaturedCollection } from "./FeaturedCollection";
import { BrandStory } from "./BrandStory";
import { ProcessShowcase } from "./ProcessShowcase";
import { Testimonials } from "./Testimonials";
import { JournalPreview } from "./JournalPreview";
import { Newsletter } from "./Newsletter";
import { InstagramFeed } from "./InstagramFeed";

interface HomePageSectionsProps {
  sections: HomeSection[];
}

/**
 * Server component orchestrator — maps enabled HomeSection entries to their
 * respective components. The discriminated union narrows `section.props`
 * automatically; no `as` casts needed.
 */
export function HomePageSections({ sections }: HomePageSectionsProps) {
  const enabled = sections.filter((s) => s.enabled);

  return (
    <main aria-label="Ms Weaver home">
      {enabled.map((section) => {
        switch (section.type) {
          case "hero":
            return <Hero key={section.type} {...section.props} />;
          case "featuredCollection":
            return <FeaturedCollection key={section.type} {...section.props} />;
          case "brandStory":
            return <BrandStory key={section.type} {...section.props} />;
          case "processShowcase":
            return <ProcessShowcase key={section.type} {...section.props} />;
          case "testimonials":
            return <Testimonials key={section.type} {...section.props} />;
          case "journalPreview":
            return <JournalPreview key={section.type} {...section.props} />;
          case "newsletter":
            return <Newsletter key={section.type} {...section.props} />;
          case "instagramFeed":
            return <InstagramFeed key={section.type} {...section.props} />;
        }
      })}
    </main>
  );
}
