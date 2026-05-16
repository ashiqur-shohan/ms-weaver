import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductBreadcrumb } from "@/components/product/Breadcrumb";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { products, getGalleryImages } from "@/lib/mock/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products
    .filter((p) => p.status === "active")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      images: [{ url: product.seo.ogImage }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product || product.status !== "active") notFound();

  const galleryImages = getGalleryImages(product);

  return (
    <>
      <section aria-label={`${product.name} detail`} className="py-8 md:py-12">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-8">
            <ProductBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: product.name },
              ]}
            />
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-12 gap-x-8 gap-y-12 md:gap-x-12">
            {/* Left: Image gallery — 7/12 */}
            <div className="col-span-12 md:col-span-7">
              <ImageGallery images={galleryImages} />
            </div>

            {/* Right: Product info — 5/12 sticky */}
            <div className="col-span-12 md:col-span-5">
              <div className="md:sticky md:top-28">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>

          {/* Below the fold: tabs */}
          <div className="mt-16 md:mt-24">
            <ProductTabs product={product} />
          </div>
        </Container>
      </section>

      {/* Related products */}
      <RelatedProducts currentProduct={product} all={products} />
    </>
  );
}
