"use client"
import Container from '@/ui/Container'
import Section from '@/ui/Section'
import React, { useState } from 'react'

export default function Blogs() {
    const [count , setCount] = useState(0);
  return (
    <Container>
        <Section>
            {count}
            <button onClick={() => setCount(count+1)}>+</button>

        </Section>
    </Container>
  )
}
