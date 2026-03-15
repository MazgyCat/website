import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import './App.css';
import { useAuth } from './hooks/use-auth';
import { AuthForms } from './components/auth/AuthForms';
import { Dashboard } from './sections/Dashboard';
import { CartProvider, useCart } from './hooks/use-cart';
import { StripeProvider } from './components/shop/StripeProvider';
import { StarburstBadge } from './components/ui/StarburstBadge';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { CartDrawer } from './components/shop/CartDrawer';
import { CheckoutPage } from './sections/CheckoutPage';





gsap.registerPlugin(ScrollTrigger);

// SVG Components
const SpiralWatermark = ({ className = '' }: { className?: string }) => (
  <svg className={`spiral-watermark opacity-[0.06] ${className}`} viewBox="0 0 200 200" fill="none">
    <path d="M100 10C54.7 10 18 46.7 18 92s36.7 82 82 82 82-36.7 82-82" stroke="#FF2D8F" strokeWidth="1" />
    <path d="M100 30C65.7 30 38 57.7 38 92s27.7 62 62 62 62-27.7 62-62" stroke="#FF2D8F" strokeWidth="1" />
    <path d="M100 50C76.7 50 58 68.7 58 92s18.7 42 42 42 42-18.7 42-42" stroke="#FF2D8F" strokeWidth="1" />
    <path d="M100 70C87.7 70 78 79.7 78 92s9.7 22 22 22 22-9.7 22-22" stroke="#FF2D8F" strokeWidth="1" />
  </svg>
);

const ScribbleLoop = ({ className = '' }: { className?: string }) => (
  <svg className={`scribble-draw ${className}`} viewBox="0 0 100 60" fill="none">
    <path d="M10 30C20 10 40 10 50 30C60 50 80 50 90 30" stroke="#FF2D8F" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

// Starburst Badge Component - MOVED TO components/ui/StarburstBadge.tsx


// Navigation
const Navigation = ({ user, onLoginClick, onCartClick }: { user: any, onLoginClick: () => void, onCartClick: () => void }) => {
  const { totalItems } = useCart();
  
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-[#0B0C0F] to-transparent">
      <div className="font-display font-black text-2xl text-[#F4F6FA] tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        MAZGY
      </div>
      <div className="hidden md:flex gap-8 font-mono text-sm items-center">
        <a href="#mayhem" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">MAYHEM</a>
        <button 
          onClick={onCartClick}
          className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors flex items-center gap-2 uppercase font-mono"
        >
          INVENTORY
          {totalItems > 0 && (
            <span className="bg-[#FF2D8F] text-[#0B0C0F] px-1.5 py-0.5 text-[10px] font-bold">
              {totalItems}
            </span>
          )}
        </button>
        <a href="#join" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">JOIN</a>
        {user ? (
          <a href="#dashboard" className="text-[#FF2D8F] font-bold hover:opacity-80 transition-opacity underline decoration-2 underline-offset-4">AGENT PORTAL</a>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-[#FF2D8F] font-bold hover:opacity-80 transition-opacity uppercase"
          >
            LOG IN
          </button>
        )}
      </div>
    </nav>
  );
};



// Section 1: Hero
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-headline',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo('.hero-subheadline',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo('.hero-image',
          { y: 40, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('.hero-sticker',
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        .fromTo('.hero-scribble',
          { strokeDashoffset: 200, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          scrub: 0.6,
          pin: false,
        }
      });

      scrollTl.fromTo('.hero-image',
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
        .fromTo('.hero-headline',
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.35, ease: 'power2.in' },
          0.7
        )
        .fromTo('.hero-subheadline',
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0.35, ease: 'power2.in' },
          0.7
        )
        .fromTo('.hero-sticker-left',
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo('.hero-sticker-right',
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#0B0C0F] overflow-hidden flex items-center justify-center">
      {/* Background watermark */}
      <SpiralWatermark className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]" />

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Headline */}
        <h1 className="hero-headline font-display font-black text-[clamp(64px,12vw,160px)] text-[#F4F6FA] uppercase tracking-[-0.04em] leading-[0.9] text-center">
          MAZGY
        </h1>

        {/* Hero Image */}
        <div className="hero-image relative my-8">
          <img
            src="/images/mazgy_hero.png"
            alt="Mazgy - The Badly Behaved Cat"
            className="w-[min(52vw,500px)] h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Subheadline */}
        <p className="hero-subheadline font-mono text-[clamp(16px,2vw,24px)] text-[#A9B1C3] uppercase tracking-widest text-center">
          Badly Behaved Cat
        </p>

        {/* Stickers */}
        <div className="hero-sticker hero-sticker-left sticker-pill absolute left-[8%] top-[18%] rotate-[-6deg]">
          ZERO REMORSE
        </div>

        <div className="hero-sticker hero-sticker-right absolute right-[8%] top-[22%]">
          <StarburstBadge text="CHAOS AGENT" className="w-24 h-24" />
        </div>

        <div className="hero-sticker hero-sticker-left sticker-rect absolute left-[10%] bottom-[18%] rotate-[8deg]">
          PROFESSIONAL MANIAC
        </div>

        <div className="hero-sticker hero-sticker-right sticker-pill absolute right-[10%] bottom-[20%] rotate-[12deg]">
          NO APOLOGIES
        </div>

        {/* Scribbles */}
        <ScribbleLoop className="hero-scribble absolute left-[5%] top-[35%] w-20 h-12 opacity-60" />
        <ScribbleLoop className="hero-scribble absolute right-[5%] top-[40%] w-16 h-10 opacity-60 rotate-180" />
      </div>
    </section>
  );
};

// Pinned Section Template
const PinnedSection = ({
  id,
  headline,
  body,
  stickerText,
  imageSrc,
  imageAlt,
  layout = 'left'
}: {
  id: string;
  headline: string;
  body: string;
  stickerText: string;
  imageSrc: string;
  imageAlt: string;
  layout?: 'left' | 'right';
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headlineEl = section.querySelector('.pin-headline');
      const bodyEl = section.querySelector('.pin-body');
      const imageEl = section.querySelector('.pin-image');
      const stickerEl = section.querySelector('.pin-sticker');
      const scribbleEl = section.querySelector('.pin-scribble');

      const isLeft = layout === 'left';
      const headlineStart = isLeft ? '-60vw' : '60vw';
      const bodyStart = isLeft ? '-40vw' : '40vw';
      const imageStart = isLeft ? '60vw' : '-60vw';
      const headlineExit = isLeft ? '-18vw' : '18vw';
      const bodyExit = isLeft ? '-12vw' : '12vw';
      const imageExit = isLeft ? '-22vw' : '22vw';
      const stickerStartX = isLeft ? '-30vw' : '30vw';

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(headlineEl,
        { x: headlineStart, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      )
        .fromTo(bodyEl,
          { x: bodyStart, opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(imageEl,
          { x: imageStart, scale: 1.06, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(stickerEl,
          { x: stickerStartX, y: '30vh', scale: 0.25, rotation: isLeft ? -20 : 20, opacity: 0 },
          { x: 0, y: 0, scale: 1, rotation: isLeft ? -8 : 8, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(scribbleEl,
          { strokeDashoffset: 200, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl.to(headlineEl,
        { x: headlineExit, opacity: 0.3, ease: 'power2.in' },
        0.7
      )
        .to(bodyEl,
          { x: bodyExit, opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(imageEl,
          { x: imageExit, opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(stickerEl,
          { y: '18vh', rotation: isLeft ? -10 : 10, opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .to(scribbleEl,
          { opacity: 0.15, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, [layout]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen bg-[#0B0C0F] overflow-hidden flex items-center"
    >
      {/* Background watermark */}
      <SpiralWatermark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className={`${layout === 'right' ? 'md:order-2 md:text-right' : ''} flex flex-col gap-6`}>
          <h2 className="pin-headline font-display font-black text-[clamp(48px,8vw,120px)] text-[#F4F6FA] uppercase tracking-[-0.03em] leading-[0.9]">
            {headline}
          </h2>
          <p className="pin-body text-[#A9B1C3] text-lg leading-relaxed max-w-md">
            {body}
          </p>
        </div>

        {/* Image */}
        <div className={`${layout === 'right' ? 'md:order-1' : ''} relative flex justify-center`}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="pin-image w-[min(44vw,450px)] h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Sticker */}
      <div className={`pin-sticker absolute ${layout === 'right' ? 'left-[6vw]' : 'right-[6vw]'} bottom-[12vh]`}>
        <StarburstBadge text={stickerText} className="w-28 h-28" />
      </div>

      {/* Scribble */}
      <ScribbleLoop className={`pin-scribble absolute ${layout === 'right' ? 'right-[10%]' : 'left-[10%]'} top-[20%] w-24 h-14 opacity-50`} />
    </section>
  );
};

// Section 6: Certified (Red Room)
const CertifiedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headlineEl = section.querySelector('.cert-headline');
      const subheadEl = section.querySelector('.cert-subhead');
      const imageEl = section.querySelector('.cert-image');
      const stickerEl = section.querySelector('.cert-sticker');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(headlineEl,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      )
        .fromTo(subheadEl,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(imageEl,
          { x: '60vw', scale: 1.06, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(stickerEl,
          { x: '30vw', y: '30vh', scale: 0.25, rotation: 20, opacity: 0 },
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // EXIT
      scrollTl.to(headlineEl,
        { x: '-18vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      )
        .to(subheadEl,
          { x: '-12vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(imageEl,
          { x: '-22vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(stickerEl,
          { y: '18vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#6C1E34] overflow-hidden flex items-center"
    >
      {/* Dark watermark */}
      <SpiralWatermark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] opacity-[0.08]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-4">
          <h2 className="cert-headline font-display font-black text-[clamp(56px,9vw,140px)] text-[#F4F6FA] uppercase tracking-[-0.03em] leading-[0.9]">
            CERTIFIED
          </h2>
          <p className="cert-subhead font-mono text-[clamp(16px,2vw,24px)] text-[#FF2D8F] uppercase tracking-widest">
            OFFICIALLY A PROBLEM
          </p>
          <p className="text-[#A9B1C3] text-lg leading-relaxed max-w-md mt-4">
            Documented. Verified. Uninsurable.
          </p>
        </div>

        {/* Image */}
        <div className="relative flex justify-center">
          <img
            src="/images/mazgy_doc.png"
            alt="Mazgy with certificate"
            className="cert-image w-[min(46vw,480px)] h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Sticker */}
      <div className="cert-sticker absolute right-[6vw] bottom-[12vh]">
        <StarburstBadge text="BADLY BEHAVED" className="w-28 h-28" />
      </div>
    </section>
  );
};

// Section 7: Proof of Mayhem (Gallery)
const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEl = section.querySelector('.gallery-header');
      const cards = section.querySelectorAll('.gallery-card');

      gsap.fromTo(headerEl,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, scale: 0.98, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const galleryItems = [
    { img: '/images/gallery_1.png', caption: 'The vase was already broken. Mazgy just finished the job.' },
    { img: '/images/gallery_2.png', caption: '3AM zoomies. No survivors.' },
    { img: '/images/gallery_3.png', caption: 'He saw a bird. The curtains didn\'t survive.' },
    { img: '/images/gallery_4.png', caption: 'One paw. Zero mercy.' },
    { img: '/images/gallery_5.png', caption: 'Document shredder? Mazgy is the shredder.' },
    { img: '/images/gallery_6.png', caption: 'Your lunch. His now.' },
  ];

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative w-full bg-[#0B0C0F] py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="gallery-header font-display font-black text-[clamp(40px,6vw,80px)] text-[#F4F6FA] uppercase tracking-[-0.03em] leading-[0.9] mb-16">
          PROOF OF MAYHEM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div key={i} className="gallery-card group relative border-2 border-[#2A2D36] overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.img}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-[#15171C]">
                <p className="text-[#A9B1C3] text-sm leading-relaxed">{item.caption}</p>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center">
                <span className="text-[#FF2D8F] text-lg">×</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#A9B1C3] mb-6">Want more crimes?</p>
          <button className="btn-primary">FOLLOW THE MAYHEM</button>
        </div>
      </div>
    </section>
  );
};

// Section 8: Join the Chaos (Signup)
const JoinSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
      toast.success("APPLICATION FOR MAYHEM RECEIVED.", {
        description: "YOU'RE NOW ON THE LIST.",
        className: "bg-[#15171C] border-[#FF2D8F] text-[#F4F6FA] font-mono",
      });
    } catch (error) {
      toast.error("CHAOS FAILED. TRY AGAIN.", {
        description: "THE SYSTEM RESISTED.",
        className: "bg-[#15171C] border-[#FF2D8F] text-[#F4F6FA] font-mono",
      });
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.join-animate');

      elements.forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
          {
            x: 0, opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative w-full bg-[#0B0C0F] py-24 overflow-hidden"
    >
      {/* Background watermark */}
      <SpiralWatermark className="absolute right-[-20%] top-[20%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Form Content */}
        <div className="flex flex-col gap-6">
          <h2 className="join-animate font-display font-black text-[clamp(40px,6vw,80px)] text-[#F4F6FA] uppercase tracking-[-0.03em] leading-[0.9]">
            JOIN THE CHAOS
          </h2>
          <p className="join-animate text-[#A9B1C3] text-lg leading-relaxed max-w-md">
            Get Mazgy's latest crimes delivered to your inbox. No apologies included.
          </p>

          {isSubmitted ? (
            <div className="join-animate bg-[#15171C] border-2 border-[#FF2D8F] p-8 max-w-md">
              <p className="font-display font-black text-2xl uppercase tracking-wider text-[#F4F6FA] mb-2">SUCCESS</p>
              <p className="text-[#A9B1C3] font-mono text-sm uppercase">You are now part of the mayhem. Watch your back.</p>
            </div>
          ) : (
            <form 
              name="join-chaos"
              onSubmit={handleSubmit}
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="join-animate flex flex-col gap-4 mt-4"
            >
              {/* Netlify Hidden Fields */}
              <input type="hidden" name="form-name" value="join-chaos" />
              <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </p>

              <input
                type="email"
                name="email"
                required
                placeholder="YOUR EMAIL"
                className="w-full max-w-md"
              />
              <input
                type="text"
                name="name"
                required
                placeholder="YOUR NAME"
                className="w-full max-w-md"
              />
              <button type="submit" className="btn-primary w-fit mt-2">
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* Image */}
        <div className="join-animate relative flex justify-center">
          <img
            src="/images/mazgy_peek.png"
            alt="Mazgy peeking"
            className="w-[min(38vw,400px)] h-auto object-contain drop-shadow-xl"
          />

          {/* Sticker */}
          <div className="absolute bottom-0 right-0 sticker-pill rotate-[-6deg]">
            NO SPAM. ONLY MAYHEM.
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 8.5: Shop (Merch)
const ShopSection = () => {

  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLElement>(null);


  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEl = section.querySelector('.shop-header');
      const cards = section.querySelectorAll('.shop-card');

      gsap.fromTo(headerEl,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, scale: 0.98, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const products = [
    { id: 'tshirt-1', img: '/images/merch_tshirt.png', name: 'MAZGY T-SHIRT', price: 29.99, tag: 'BESTSELLER' },
    { id: 'hoodie-1', img: '/images/merch_hoodie.png', name: 'CHAOS HOODIE', price: 54.99, tag: 'NEW' },
    { id: 'mug-1', img: '/images/merch_mug.png', name: 'ZERO REMORSE MUG', price: 14.99, tag: null },
    { id: 'cap-1', img: '/images/merch_cap.png', name: 'REBEL SNAPBACK', price: 24.99, tag: null },
    { id: 'tote-1', img: '/images/merch_tote.png', name: 'PURREBEL TOTE', price: 19.99, tag: 'LIMITED' },
    { id: 'phonecase-1', img: '/images/merch_phonecase.png', name: 'REBEL CAT CASE', price: 17.99, tag: null },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img
    });
    toast.success(`${product.name} ADDED TO INVENTORY`, {
      description: "CHOSEN FOR MAXIMUM CHAOS.",
      className: "bg-[#15171C] border-[#FF2D8F] text-[#F4F6FA] font-mono",
    });
  };


  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative w-full bg-[#0B0C0F] py-24 overflow-hidden"
    >
      {/* Background watermark */}
      <SpiralWatermark className="absolute left-[-10%] top-[30%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="shop-header font-display font-black text-[clamp(40px,6vw,80px)] text-[#F4F6FA] uppercase tracking-[-0.03em] leading-[0.9]">
            MAZGY MERCH
          </h2>
          <p className="text-[#A9B1C3] text-lg max-w-md">
            Wear the chaos. Official Mazgy merchandise for badly behaved humans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div key={i} className="shop-card group relative">
              {/* Tag */}
              {product.tag && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#FF2D8F] text-[#0B0C0F] font-mono text-xs font-bold">
                  {product.tag}
                </div>
              )}

              {/* Product Image */}
              <div className="relative aspect-square bg-[#15171C] border-2 border-[#2A2D36] overflow-hidden group-hover:border-[#FF2D8F] transition-colors duration-300">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-[#F4F6FA] text-lg">{product.name}</h3>
                  <p className="text-[#FF2D8F] font-mono font-bold">£{product.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-10 h-10 flex items-center justify-center bg-[#2A2D36] text-[#F4F6FA] hover:bg-[#FF2D8F] hover:text-[#0B0C0F] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-primary">VIEW ALL PRODUCTS</button>
        </div>
      </div>
    </section>
  );
};

// Section 9: Footer
const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0B0C0F] py-16 border-t border-[#2A2D36]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Column */}
          <div>
            <div className="font-display font-black text-3xl text-[#F4F6FA] tracking-tighter mb-2">
              MAZGY
            </div>
            <p className="text-[#A9B1C3] text-sm">
              Badly behaved since 2022.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 font-mono text-sm">
              <a href="#mayhem" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">MAYHEM</a>
              <a href="#proof" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">PROOF</a>
              <a href="#shop" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">SHOP</a>
              <a href="#" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">PRIVACY</a>
            </div>
            <div className="flex gap-6 font-mono text-sm">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow MAZGY on Instagram" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">INSTAGRAM</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow MAZGY on TikTok" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">TIKTOK</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to MAZGY on YouTube" className="text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors">YOUTUBE</a>
            </div>
          </div>
        </div>

        {/* Bottom Sticker */}
        <div className="mt-12 flex justify-center">
          <div className="sticker-pill">
            ZERO REMORSE
          </div>
        </div>

        <div className="mt-8 text-center text-[#A9B1C3] text-xs">
          © 2025 Mazgy. All chaos reserved.
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthModalOpen(false);
    }
  }, [user]);

  // Handle successful checkout
  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    toast.success("MAYHEM EN ROUTE.", {
      description: "CHECK YOUR PORTAL FOR UPDATES.",
      className: "bg-[#15171C] border-[#FF2D8F] text-[#F4F6FA] font-mono",
    });
  };

  useEffect(() => {

    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <StripeProvider>
        <div className="relative">
          {/* Grain overlay */}
          <div className="grain-overlay" />

          <Toaster position="bottom-right" />

          {/* Navigation */}


          <Navigation 
            user={user} 
            onLoginClick={() => setIsAuthModalOpen(true)} 
            onCartClick={() => setIsCartOpen(true)}
          />

          {/* Main Content Area */}
          <main className="relative">
            {isCheckoutOpen ? (
              <CheckoutPage 
                onBack={() => setIsCheckoutOpen(false)} 
                onSuccess={handleCheckoutSuccess} 
              />
            ) : (
              <>
                {user && (
                  <div id="dashboard">
                    <Dashboard user={user} />
                  </div>
                )}
                
                <HeroSection />



            <PinnedSection
              id="mayhem"
              headline="ZERO REMORSE"
              body="Mazgy does what he wants, when he wants. Your rules? Irrelevant. Your feelings? Not his department. He's the cat who knocks the glass off the table and makes eye contact while it falls."
              stickerText="100% UNBOTHERED"
              imageSrc="/images/mazgy_face.png"
              imageAlt="Mazgy unbothered"
              layout="left"
            />

            <PinnedSection
              id="chaos"
              headline="CHAOS AGENT"
              body="He's not random—he's strategic. Every knocked lamp, every 3AM sprint, every shredded curtain is part of the plan. Mazgy turns your living room into a warzone… then naps in the wreckage."
              stickerText="PROFESSIONAL MANIAC"
              imageSrc="/images/mazgy_yawn.png"
              imageAlt="Mazgy chaos"
              layout="right"
            />

            <PinnedSection
              id="professional"
              headline="PROFESSIONAL MANIAC"
              body="Years of experience. Zero qualifications. Mazgy operates outside the system—no license, no leash, no bedtime. If there's a mess, he's already in it. If there's silence, he's about to end it."
              stickerText="NO APOLOGIES"
              imageSrc="/images/mazgy_hero.png"
              imageAlt="Mazgy professional"
              layout="left"
            />

            <PinnedSection
              id="apologies"
              headline="NO APOLOGIES"
              body="You wanted a sweet cat. Mazgy is not that. He's the villain of your household—and he's thriving. The only thing he's sorry about is that he can't cause more chaos… yet."
              stickerText="ZERO REMORSE"
              imageSrc="/images/mazgy_lying.png"
              imageAlt="Mazgy no apologies"
              layout="right"
            />

            <CertifiedSection />

            <GallerySection />

            <ShopSection />

            <JoinSection />

            <Footer />
              </>
            )}
          </main>

          {/* Cart Drawer */}
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />

          {/* Auth Modal */}
          <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <DialogContent className="bg-[#15171C] border-[#2A2D36] text-[#F4F6FA] max-w-md p-0 overflow-hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>Authentication</DialogTitle>
              </DialogHeader>
              <AuthForms />
            </DialogContent>
          </Dialog>
        </div>
      </StripeProvider>
    </CartProvider>
  );
}


export default App;
