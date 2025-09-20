import CategorySection from "@/components/home/CategorySection";
import CouponSection from "@/components/home/CouponSection";
import FeaturedProductSection from "@/components/home/FeatureSection";
import Header from "@/components/Header";
import ReviewSection from "@/components/home/ReviewSection";
import Container from "@/ui/Container";

export default function Home() {
  return (
    <Container>
      <Header />
      <CategorySection />
      <FeaturedProductSection />
      <CouponSection />
      <ReviewSection />
    </Container>
  );
}
