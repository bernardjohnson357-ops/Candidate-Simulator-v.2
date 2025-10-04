// app/page.tsx
"use client";

import React, { useState } from "react";
import ModuleDisplay from "../components/ModuleDisplay";
import module0Data from "../data/modules/module0.json";

export default function HomePage() {
  const [module] = useState(module0Data);

  return (
    <div>
      <ModuleDisplay module={module} />
    </div>
  );
}
