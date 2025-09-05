import CategorySection from "@/components/CategorySection";
import CouponSection from "@/components/CouponSection";
import FeaturedProductSection from "@/components/FeatureSection";
import Header from "@/components/Header";
import ReviewSection from "@/components/ReviewSection";
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
