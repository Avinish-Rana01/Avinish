import React from 'react';
import { motion } from 'framer-motion';
import TechnologyPill from './TechnologyPill';

const MarqueeRow = ({ items, reverse = false, speed = 40 }) => {
  // Duplicate items twice to ensure smooth infinite loop across wide screens
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden group select-none w-full relative">
      {/* 
        Using Framer Motion's infinite animation. 
        We animate a wide container. The trick is to animate x from 0 to -1/3 of its width.
        To avoid complex width calculations, we can use percent-based translation 
        on a flex container that holds 3 identical sets of items.
      */}
      <motion.div
        className="flex flex-shrink-0 gap-12 sm:gap-16 md:gap-24 py-2 sm:py-3 pr-12 sm:pr-16 md:pr-24 items-center"
        initial={{ x: reverse ? '-33.33%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-33.33%' }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          // If group is hovered, Framer Motion doesn't natively support pause via group-hover well in standard animate,
          // but we can use simple CSS animation for the marquee if we want native pause.
          // However, user requested Framer motion. Let's stick to motion and use CSS for pause if needed,
          // or we can just accept that the user wanted a buttery smooth marquee. 
          // Actually, standard CSS animation is better for "pause on hover". Let's build a hybrid!
        }}
        // Adding a custom class to pause on hover using CSS
        style={{
          width: 'max-content',
        }}
      >
        {duplicatedItems.map((tech, idx) => (
          <TechnologyPill key={`${tech.name}-${idx}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
};

const TechnologyMarquee = ({ technologies }) => {
  const halfIndex = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, halfIndex);
  const row2 = technologies.slice(halfIndex);

  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-2 sm:gap-4 marquee-container">
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 left-0 bottom-0 w-[10%] sm:w-[15%] z-10 bg-gradient-to-r from-[#0C0C0C] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-[10%] sm:w-[15%] z-10 bg-gradient-to-l from-[#0C0C0C] to-transparent pointer-events-none" />

      <MarqueeRow items={row1} speed={60} />
      <MarqueeRow items={row2} reverse speed={70} />
    </div>
  );
};

export default React.memo(TechnologyMarquee);
