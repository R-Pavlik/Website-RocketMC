import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      //* project colors



       danger: '#EE4E4E',
       info: '#2D9CDB',
       success: '#6FCF97',
       warning: '#F2994A',
       dark: '#45474B',
       light: '#F8F9FA',

      // default colors
      green: '#349934',
      blue: '#0000ff',
      red: '#ff0000',
      darkred:'#BF2F31',
      yellow: '#ffff00',
      white: '#ffffff',
      black: '#000000',
      gray: '#808080',
      lightergray:'#333333',
      darkergray:'#353535',
      darkgray:'#191818',
      footergray:'#1E1E1E',
      gradient_start: '#F9D436',
      gradient_end: '#E96745',

      discord:{
        blue: '#5865F2'
      },
      instagram: {
        pink:'#E1306C'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;
