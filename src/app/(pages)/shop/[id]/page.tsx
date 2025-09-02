"use client";
import Loading from "@/app/loading";
import { useGetitem } from "@/hooks/useItems";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: product, isLoading } = useGetitem(id);
  if (isLoading) return <Loading />;
  return (
    <Container>
      <Section className="flex flex-col">
        {product?.name}
        {product?.price}
      </Section>
    </Container>
  );
}
