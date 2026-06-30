import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // The 3D background (react-three-fiber) and the tilt card are inherently
    // imperative: they mutate three.js objects inside useFrame, generate a
    // one-time random star field with Math.random, and read element styles /
    // refs in pointer handlers and rAF loops. These are idiomatic for R3F and
    // DOM-driven interactions, so the experimental React Compiler purity rules
    // do not apply here.
    files: ["src/components/Background3D.tsx", "src/components/TiltCard.tsx"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
]);

export default eslintConfig;
