"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React, { useContext } from "react";
import { RotateLoader } from "react-spinners";
import { ThemeContext, PALETTES } from "@/providers/ThemeProvider";

export default function Loading() {
  const context = useContext(ThemeContext);
  const primaryColor = context ? PALETTES[context.palette]?.primary : "#0c94e8";

  return (
    <Container>
      <Section className="h-100 flex items-center justify-center text-2xl text-primary">
        <RotateLoader
          color={primaryColor}
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Section>
    </Container>
  );
}
