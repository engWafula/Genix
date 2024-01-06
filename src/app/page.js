import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Welcome to Genix&apos;s Pastry, where passion for baking meets culinary artistry. At Genix&apos;s, we believe that every bite should be a delightful experience, and our commitment to crafting exceptional pastries reflects our dedication to this philosophy.
          </p>
          <p>
            Customer satisfaction is our top priority, and we take pride in delivering an unparalleled level of service. Our knowledgeable and friendly staff is always ready to assist you in choosing the perfect pastry or dessert to suit your cravings.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            0704154578
          </a>
        </div>
      </section>
    </>
  );
}
