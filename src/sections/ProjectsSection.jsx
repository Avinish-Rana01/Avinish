import React, { useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../constants/projectsData';

const TOTAL_CARDS = PROJECTS.length;

const ProjectsSection = () => {
  const containerRef = useRef(null);

  return (
    <section
      className="rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-3 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-10"
      style={{ background: '#000000' }}
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
