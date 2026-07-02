import React from 'react';
import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'React Development',
    description:
      'Building scalable, component-based web applications using React.js, Hooks, and modern state management patterns.',
  },
  {
    number: '02',
    name: 'UI/UX Design',
    description:
      'Designing clean, intuitive, and user-centered interfaces with a strong focus on layout, typography, and visual hierarchy.',
  },
  {
    number: '03',
    name: 'Responsive Web Design',
    description:
      'Crafting fully responsive layouts that work seamlessly across mobile, tablet, and desktop devices.',
  },
  {
    number: '04',
    name: 'API Integration',
    description:
      'Connecting frontend interfaces to REST APIs using Fetch and Axios, handling async operations and dynamic data.',
  },
  {
    number: '05',
    name: 'Performance Optimization',
    description:
      'Optimizing web applications for fast load times, smooth rendering, and cross-browser compatibility.',
  },
];

const ServicesSection = () => {
  return (
    <section
      className="rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
      id="skills"
    >
      {/* Heading */}
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0C0C0C' }}
      >
        Services
      </h2>

      {/* Service items */}
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              {/* Number */}
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C' }}
                aria-hidden="true"
              >
                {service.number}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col gap-2 pt-2">
                <span
                  className="font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: '#0C0C0C' }}
                >
                  {service.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    color: '#0C0C0C',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
