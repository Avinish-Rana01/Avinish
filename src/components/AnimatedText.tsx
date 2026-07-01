import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={`relative ${className}`} aria-label={text} style={style}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;

        return (
          <React.Fragment key={i}>
            <WordSpan
              word={word}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};

interface WordSpanProps {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}

const WordSpan: React.FC<WordSpanProps> = ({ word, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* invisible placeholder to maintain layout width */}
      <span className="invisible">{word}</span>
      <motion.span
        className="absolute inset-0"
        style={{ opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
