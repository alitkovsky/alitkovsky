import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const nextCoreWebVitalsWithoutParser = nextCoreWebVitals.map((entry) => {
  if (!entry.languageOptions?.parser) {
    return entry;
  }

  const { parser: _nextParser, ...languageOptions } = entry.languageOptions;

  return {
    ...entry,
    languageOptions,
  };
});

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "docs/**",
      "data/**",
      "**/*.ts",
      "**/*.tsx",
      "**/*.backup.*",
      "test-portfolio-screenshots.js",
    ],
  },
  ...nextCoreWebVitalsWithoutParser,
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    settings: {
      react: {
        version: "19.2",
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "quotes": "off",
      "no-useless-escape": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },
];

export default config;
