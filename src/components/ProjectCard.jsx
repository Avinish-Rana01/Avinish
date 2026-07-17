import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';

const ProjectCard = ({ project, index, totalCards, scrollContainerRef }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [index / totalCards, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="h-[40vh] sm:h-[85vh] flex items-start justify-center"
      style={{ position: 'sticky', top: `${64 + index * 20}px` }}
    >
      <motion.div
        className="w-full border border-[#D7E2EA]/40 sm:border-2 sm:border-[#D7E2EA] p-3 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-6"
        style={{
          background: '#000000',
          borderRadius: 'clamp(20px, 5vw, 60px)',
          scale,
          transformOrigin: 'top center',
        }}
      >
        {/* Top row — stacks on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            {/* Large number */}
            <span
              className="font-black leading-none"
              style={{ fontSize: 'clamp(2rem, 10vw, 140px)', color: '#D7E2EA' }}
            >
              {project.number}
            </span>
            {/* Category + Project name */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span
                className="font-light uppercase tracking-widest"
                style={{ color: '#D7E2EA', fontSize: 'clamp(0.6rem, 1.2vw, 1rem)', opacity: 0.6 }}
              >
                {project.category}
              </span>
              <span
                className="font-medium uppercase"
                style={{ color: '#D7E2EA', fontSize: 'clamp(0.8rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          {/* Live Project button */}
          <LiveProjectButton id={`live-project-${project.number}`} href={project.link} />
        </div>

        {/* Bottom row: image grid — single column on mobile, two columns on sm+ */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-1 min-h-0">
          {/* Left column (or top on mobile) */}
          <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 sm:w-[40%]">
            <img
              src={project.col1img1}
              alt={`${project.name} preview 1`}
              className="w-1/2 sm:w-full object-cover"
              style={{
                borderRadius: 'clamp(12px, 3vw, 60px)',
                height: 'clamp(80px, 16vw, 230px)',
              }}
              loading="lazy"
            />
            <img
              src={project.col1img2}
              alt={`${project.name} preview 2`}
              className="w-1/2 sm:w-full object-cover"
              style={{
                borderRadius: 'clamp(12px, 3vw, 60px)',
                height: 'clamp(80px, 16vw, 340px)',
              }}
              loading="lazy"
            />
          </div>
          {/* Right column (or bottom on mobile) */}
          <div className="sm:w-[60%]">
            <img
              src={project.col2img}
              alt={`${project.name} main`}
              className="w-full h-full object-cover"
              style={{ borderRadius: 'clamp(12px, 3vw, 60px)' }}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ProjectCard);
