import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';



const PROJECTS = [
  {
    number: '01',
    category: 'Personal',
    name: 'Food Ordering App',
    link: 'https://avigrill.netlify.app/',
    col1img1: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890249/Screenshot_2026-07-01_124448_f0wxvu.png',
    col1img2: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890249/Screenshot_2026-07-01_124522_cfsajk.png',
    col2img:  'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890249/Screenshot_2026-07-01_124453_yqxpv3.png',
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Dazk Cloud Analytics',
    link: 'https://dazk.tech/',
    col1img1: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782889975/dazk2_3_qavdrc.png',
    col1img2: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782889977/dazk2_2_waqlyq.png',
    col2img: 'https://res.cloudinary.com/dvxemrtys/image/upload/v1782889976/dazk2_1_qed5zv.png',
  },
  {
    number: '03',
    category: 'Live Project',
    name: 'Tomoboshi Dashboard',
    link: 'https://tomoboshi-admin.netlify.app/#home',
    col1img1: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890603/Screenshot_2026-07-01_125052_nl2nz8.png',
    col1img2: 'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890604/Screenshot_2026-07-01_125304_xvoat2.png',
    col2img:  'https://res.cloudinary.com/dvxemrtys/image/upload/f_auto,q_auto/v1782890604/Screenshot_2026-07-01_125153_oz0m1y.png',
  },
];

const TOTAL_CARDS = PROJECTS.length;

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
      className="h-[75vh] sm:h-[85vh] flex items-start justify-center"
      style={{ position: 'sticky', top: `${64 + index * 20}px` }}
    >
      <motion.div
        className="w-full border border-[#D7E2EA]/40 sm:border-2 sm:border-[#D7E2EA] p-3 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-6"
        style={{
          background: '#0C0C0C',
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

const ProjectsSection = () => {
  const containerRef = useRef(null);

  return (
    <section
      className="rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-3 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-10"
      style={{ background: '#0C0C0C' }}
      id="projects"
    >
      {/* Heading */}
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-12 md:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      {/* Sticky cards container */}
      <div ref={containerRef}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={TOTAL_CARDS}
            scrollContainerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
