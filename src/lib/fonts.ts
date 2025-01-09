import localFont from "next/font/local";

export const epicene = localFont({
  src: [
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-bold-italic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-bold.woff2',
      weight: '800',
      style: 'normal',
    },
    
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-black-italic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './fonts/Test-Epicene-Display/test-epicene-display-black.woff2',
      weight: '900',
      style: 'normal',
    },
   
  ],
  variable: "--font-heading",
});
export const epiceneText = localFont({
  src: [
    {
      path: './fonts/Test-Epicene-Text/test-epicene-text-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Test-Epicene-Text/test-epicene-text-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Test-Epicene-Text/test-epicene-text-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Test-Epicene-Text/test-epicene-text-black.woff2',
      weight: '900',
      style: 'normal',
    },
   
  ],
  variable: "--font-resources",
});

export const sohne = localFont({
  src: [

    {
      path: './fonts/Test-Sohne/test-soehne-buch.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Test-Sohne/test-soehne-kraftig.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Test-Sohne/test-soehne-halbfett.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Test-Sohne/test-soehne-dreiviertelfett.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Test-Sohne/test-soehne-fett.woff2',
      weight: '800',
      style: 'normal',
    },
   
  ],
  variable: "--font-sans",
});