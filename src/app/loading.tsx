import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";
import { RotateLoader } from "react-spinners";

export default function Loading() {
  return (
    <Container>
      <Section className="h-100 flex items-center justify-center text-2xl">
        <RotateLoader
          color={"#0c94e8"}
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Section>
    </Container>
  );
}
