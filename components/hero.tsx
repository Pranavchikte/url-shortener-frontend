// components/hero.tsx

import React from "react";
import { Cover } from "@/components/ui/cover";

export function Hero() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-12 text-center md:pt-20">
      <h1 className="brand-gradient-text text-balance text-4xl font-extrabold leading-tight md:text-6xl">
        Shorten Your <Cover>Loooong Links</Cover> :)
      </h1>
      <p className="mt-4 text-pretty text-zinc-400 md:text-lg">
        Efficient and easy-to-use URL shortening service
      </p>
    </div>
  );
}