import { defineTextStyles } from '@pandacss/dev';
// import { GLYPH } from '@gitanimals/ui-token';

// const glyphTextStyle: any = Object.keys(GLYPH).reduce((acc, size) => {
//   const thicknesses = Object.keys(GLYPH[size as keyof typeof GLYPH]);

//   thicknesses.reduce<Record<string, any>>((innerAcc, thickness) => {
//     innerAcc[size][thickness] = {
//       value: {
//         ...GLYPH[size as keyof typeof GLYPH][thicknes],
//       },
//     };
//     return innerAcc;
//   }, acc);

//   return acc;
// }, {});

export const textStyles = defineTextStyles({
  // ...glyphTextStyle,
  glyph82: {
    bold: {
      value: { fontWeight: 700 },
    },
  },
});
