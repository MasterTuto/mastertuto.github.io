# Fonts for the Open Graph cards

Used only by `scripts/generate-og-images.mjs` at build time (resvg needs TTF files). All are
under the SIL Open Font License 1.1 (see `OFL-Poppins.txt`; Inter and Noto Sans JP use the same license).

- **Poppins** SemiBold and Medium: headings, as `font-title` on the site.
- **Inter** Regular and SemiBold: body text and Cyrillic headings. Static instances (wght 400/600) of the variable font.
- **Noto Sans JP** Regular and SemiBold: Japanese pages. Static instances subset to kana, JIS level-1 kanji
  and every character in `src/app/i18n/japanese.ts`. If new Japanese copy uses a rarer kanji, regenerate
  the subset with fontTools (`instancer.instantiateVariableFont` + `subset`).
