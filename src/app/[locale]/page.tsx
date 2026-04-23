import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import ProductCategories from '@/components/sections/ProductCategories';
import Gallery from '@/components/sections/Gallery';
import WhyUs from '@/components/sections/WhyUs';
import IndustriesSection from '@/components/sections/IndustriesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import ScrollProgress from '@/components/motion/ScrollProgress';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollProgress />
      <Hero />
      <AboutPreview />
      <ProductCategories />
      <Gallery />
      <WhyUs />
      <IndustriesSection />
      <FeaturedProducts />
      <Testimonials />
      <CallToAction />
    </>
  );
}
