import React, { useEffect, useRef, useState } from 'react';

// 7 actual project MP4 recordings
const VIDEOS = [
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745451/1_zyxchu.mp4',  // Food App – Restaurant cards
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745452/2_oruytx.mp4',  // Food App – Menu/filter
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745443/3_moplky.mp4',  // Tomoboshi – Dashboard scroll
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745458/4_ltzti3.mp4',  // Tomoboshi – Map interaction
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745441/5_udixya.mp4',  // Dazk – Hero + glassmorphic
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745441/6_a4etqy.mp4',  // Dazk – Metrics dashboard
  'https://res.cloudinary.com/dvxemrtys/video/upload/v1782745441/7_b7su7x.mp4',  // Mobile responsive view
];

// Row 1: 11 unique slots — cycle through 7, varied order
const ROW1_BASE = [
  VIDEOS[0], VIDEOS[2], VIDEOS[4], VIDEOS[1], VIDEOS[6],
  VIDEOS[3], VIDEOS[5], VIDEOS[0], VIDEOS[4], VIDEOS[2], VIDEOS[6],
];

// Row 2: 10 unique slots — different order for visual variety
const ROW2_BASE = [
  VIDEOS[5], VIDEOS[1], VIDEOS[3], VIDEOS[6], VIDEOS[0],
  VIDEOS[4], VIDEOS[2], VIDEOS[5], VIDEOS[3], VIDEOS[1],
];

// Triple each row for seamless infinite scroll illusion
const ROW1 = [...ROW1_BASE, ...ROW1_BASE, ...ROW1_BASE];
const ROW2 = [...ROW2_BASE, ...ROW2_BASE, ...ROW2_BASE];

const LazyVideoTile = ({ src }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  // Cloudinary optimizations:
  // - Video: f_auto (auto format like webm/mp4), q_auto (auto quality), w_420 (resize to tile width)
  // - Poster: f_auto, q_auto, so_0 (first frame), change extension to .jpg
  const optimizedVideoUrl = src.replace('/video/upload/', '/video/upload/f_auto,q_auto,w_420/');
  const posterUrl = src.replace('/video/upload/', '/video/upload/f_auto,q_auto,so_0/').replace('.mp4', '.jpg');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '0px 300px 0px 300px', // start loading before entering viewport horizontally
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 bg-[#161616] w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px]"
    >
      {isIntersecting ? (
        <video
          src={optimizedVideoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={posterUrl}
          alt="Project preview frame"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
      id="marquee"
    >
      {/* Row 1 — moves right on scroll */}
      <div
        className="flex gap-3 mb-3"
        style={{
          willChange: 'transform',
          transform: `translateX(${offset - 200}px)`,
        }}
      >
        {ROW1.map((src, i) => (
          <LazyVideoTile key={`r1-${i}`} src={src} />
        ))}
      </div>

      {/* Row 2 — moves left on scroll */}
      <div
        className="flex gap-3"
        style={{
          willChange: 'transform',
          transform: `translateX(${-(offset - 200)}px)`,
        }}
      >
        {ROW2.map((src, i) => (
          <LazyVideoTile key={`r2-${i}`} src={src} />
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
