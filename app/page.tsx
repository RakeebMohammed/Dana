import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";
import { decodeSession } from "@/lib/session";
import LeadForm from "./LeadForm";
import FaqAccordion from "./FaqAccordion";
import AnalyticsTracker from "./AnalyticsTracker";

const LOGO = "https://framerusercontent.com/images/X01vDpfkKKl1sNVSXCe6XyGulOs.svg?width=115&height=36";
const HERO = "https://framerusercontent.com/images/fZrpyOzXMMHlEkSgHcQlrzyT1c.png?width=1440";
const PRODUCT = "https://framerusercontent.com/images/LnM3VGV5pKVK5pN04RJNXNUzc74.png?width=1200";
const HUMAN = "https://framerusercontent.com/images/pS3xsi9ghd4SLjhr1JxPoc7qIQ0.jpg?width=1000";

const testimonials = [
  ["Luca", "The video call showcasing the product excited me — the agent explained everything well."],
  ["Emma", "Great experience. Good demonstration by the consultant."],
  ["Samuel", "Good to have this feature, able to understand better."],
  ["Daniel", "Awesome initiative. All my queries were answered well."],
  ["Oliver", "The executive guided our decision-making really effectively."],
  ["Sofia", "An amazing experience, a nice way to shop online."],
];

export default function LandingPage() {
  const session = decodeSession<{ email: string }>(cookies().get("session")?.value);
  if (!session) redirect("/gate");
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return <>
    {gaId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}</Script></>}
    <div className="popin-site">
      <AnalyticsTracker />
      <header className="popin-header">
        <a href="#top" aria-label="Popin home"><img src={LOGO} alt="Popin" /></a>
        <nav><a href="#about">About</a><a href="#solutions">Solutions</a><a href="#stories">Stories</a><a href="#faq">FAQ</a></nav>
        <a className="header-cta" href="#contact-form">Get in touch <span>↗</span></a>
      </header>

      <main id="top">
        <section className="popin-hero">
          <p className="hero-kicker">THE FUTURE OF COMMERCE IS HUMAN</p>
          <h1>The Real Way<br />To Shop Virtually.</h1>
          <p className="hero-copy">Bring the warmth and confidence of an in-store conversation to every online customer.</p>
          <a className="popin-button" href="#contact-form">Get in touch <span>↗</span></a>
          <div className="hero-visual"><div className="visual-glow" /><img src={HERO} alt="Popin live video shopping experience" /></div>
        </section>

        <section className="proof-strip" aria-label="Popin outcomes"><div><strong>500k+</strong><span>video call minutes</span></div><div><strong>95%</strong><span>customer satisfaction</span></div><div><strong>1:1</strong><span>human connection</span></div><p>Trusted live conversations for teams that care about their customers.</p></section>

        <section className="story-section" id="about"><div className="section-intro"><p>BE THERE. VIRTUALLY.</p><h2>Turn the way your customers communicate into the way they shop.</h2><span>Customers want a real person, not another support ticket. Popin gives your team a seamless way to meet them right where they are.</span></div><div className="feature-cards"><article><i>01</i><h3>Connect instantly</h3><p>Start a live video conversation in one click. No app downloads, no waiting.</p></article><article><i>02</i><h3>Show, don&apos;t tell</h3><p>Share products, guide choices and make every detail feel tangible.</p></article><article><i>03</i><h3>Convert with confidence</h3><p>Build the trust that turns thoughtful conversations into action.</p></article></div></section>

        <section className="showcase" id="solutions"><div className="showcase-media"><img src={PRODUCT} alt="Popin virtual shopping product interface" /></div><div className="showcase-copy"><p>INTEGRATIONS THAT DO MORE</p><h2>Everything your team needs to be personal at scale.</h2><p>Popin sits beautifully inside your existing journey, giving shoppers immediate access to your experts through video, chat and real interaction.</p><a className="text-link" href="#contact-form">Explore the experience <span>→</span></a></div></section>

        <section className="human-section"><div className="human-copy"><p>THE HUMAN TOUCH</p><h2>Bring the personal touch of in-store shopping to your online store.</h2><a className="popin-button light" href="#contact-form">Talk to our team <span>↗</span></a></div><div className="human-image"><img src={HUMAN} alt="Popin specialist speaking with a customer" /><div className="floating-stat"><strong>Always</strong><span>one conversation away</span></div></div></section>

        <section className="testimonial-section" id="stories"><div className="section-intro compact"><p>REAL PEOPLE, REAL MOMENTS</p><h2>Make your customer love you.</h2></div><div className="testimonial-grid">{testimonials.map(([name, quote]) => <figure key={name}><div className="quote-mark">“</div><blockquote>{quote}</blockquote><figcaption><span>{name}</span><small>Popin customer</small></figcaption></figure>)}</div></section>

        <section className="faq-section" id="faq"><div><p>GOT QUESTIONS?</p><h2>Everything you need to know about Popin.</h2></div><FaqAccordion /></section>

        <section className="contact-section" id="contact-form"><div><p>LET&apos;S MAKE IT PERSONAL</p><h2>Turn more visits into meaningful conversations.</h2><span>Tell us a little about your team and we&apos;ll show you what live shopping can feel like.</span></div><LeadForm /></section>
      </main>

      <footer className="popin-footer"><img src={LOGO} alt="Popin" /><p>Better conversations. Better conversions.</p><span>Signed in as {session.email}</span></footer>
    </div>
  </>;
}
