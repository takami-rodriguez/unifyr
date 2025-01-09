import localFont from "next/font/local";

export const epicene = localFont({
  src: [
    {
      path: './fonts/Epicene-Display/epicene-display-bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Epicene-Display/epicene-display-black.woff2',
      weight: '900',
      style: 'normal',
    },
   
  ],
  variable: "--font-heading",
});
export const epiceneText = localFont({
  src: [
    {
      path: './fonts/Epicene-Text/epicene-text-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Epicene-Text/epicene-text-regular-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Epicene-Text/epicene-text-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Epicene-Text/epicene-text-bold-italic.woff2',
      weight: '700',
      style: 'italic',
    },
 
   
  ],
  variable: "--font-resources",
});

export const sohne = localFont({
  src: [
    {
      path: './fonts/Sohne/soehne-buch.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Sohne/soehne-buch-kursiv.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Sohne/soehne-halbfett.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Sohne/soehne-dreiviertelfett.woff2',
      weight: '700',
      style: 'normal',
    },

   
  ],
  variable: "--font-sans",
});