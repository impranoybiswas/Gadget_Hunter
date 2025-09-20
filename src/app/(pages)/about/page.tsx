import Button from "@/ui/Button";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";
import { FaSun } from "react-icons/fa";

export const metadata = { title: "About | Gadget Hunter" };

export default function About() {
  return (
    <Container>
      <Section title="About Us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." className=" ">
        <span>hello</span>
        <span>world</span><br/> <br/>
        <button className="bg-gradient-to-r from-[#2382A9] to-[#24B79F] px-5 h-8 rounded-md shadow text-white">Submit</button><br/><br/>
        <span className="flex gap-2">
        <Button label="Submit" isOutline={false} isLarge={false} />
        <Button label="Submit" isOutline={true} isLarge={false} />
        <Button className="w-9" leftIcon={<FaSun/>} isOutline={false} isLarge={false} />
        </span>
        
      </Section>
    </Container>
  );
}
