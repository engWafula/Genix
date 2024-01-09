import {AppProvider} from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast";
import Head from 'next/head';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Genix Pastry and Restaurant - Enjoy Delicious Meals',
  description: 'Explore a variety of mouth-watering dishes at Genix Pastry and Restaurant. From delectable pastries to savory restaurant specialties, we offer a delightful culinary experience.',
  keywords: 'Genix Pastry, Genix Restaurant, Delicious Pastries, Gourmet Food, Fine Dining, Culinary Delights, Best Restaurant, Food Experience,Best Restaurant',
  author: 'Genix Pastry and Restaurant',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_oNciqO3SCY33DCxiW8vGYWVKMlm2JCKNA&usqp=CAU', // Replace with the URL of your restaurant's image
  url: 'https://genixspastryrestaurant.com', // Replace with your website URL
  siteName: 'Genix Pastry and Restaurant',
  type: 'website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
        <head>
    {/* Start of Tawk.to Script */}
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/659919578d261e1b5f5036d3/1hjf0lvlf';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
    {/* End of Tawk.to Script */}
  </head>
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2023 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
