# React Bits components

These ten TypeScript/CSS components were copied from the free [React Bits](https://reactbits.dev/) registry on 2026-09-27:

Aurora, BlurText, ClickSpark, CountUp, DecryptedText, ElectricBorder, GradientText, RotatingText, ShinyText, and SpotlightCard.

Source pattern: `https://reactbits.dev/r/<Component>-TS-CSS.json`.

The registry CSS files were consolidated into `styles/reactbits.css` because this Next.js Pages Router project loads global styles from `pages/_app.tsx`. Component CSS imports were removed; otherwise the registry source is kept as delivered. The components are used by `pages/bits-overload.tsx` and `pages/still.tsx`; each page has its own CSS module.

React Bits is published under [MIT + Commons Clause](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md).
