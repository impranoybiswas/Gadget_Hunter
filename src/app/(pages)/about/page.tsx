import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";

export const metadata = { title: "About | Gadget Hunter" };

export default function About() {
  return (
    <Container>
      <Section title="About Us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." className="bg-red-200 grid grid-cols-2 ">
        <span>hello</span>
        <span>world</span>
      </Section>
    </Container>
  );
}
