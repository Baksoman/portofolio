"use client";

import { useEffect, useRef } from "react";
import "./word-rain.css";

export function WordRainBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const WORDS = [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js',
      'HTML', 'CSS', 'Tailwind', 'API', 'REST', 'GraphQL',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
      'Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Netlify',
      'Redux', 'Zustand', 'Context', 'Hooks', 'useState',
      'useEffect', 'async', 'await', 'Promise', 'fetch',
      'map', 'filter', 'reduce', 'forEach', 'slice',
      'push', 'pop', 'shift', 'unshift', 'splice',
      'const', 'let', 'var', 'function', 'arrow', 'class',
      'import', 'export', 'default', 'return', 'if', 'else',
      'for', 'while', 'switch', 'case', 'break', 'continue',
      'try', 'catch', 'throw', 'finally', 'new', 'this',
      'true', 'false', 'null', 'undefined', 'typeof', 'void',
      'Frontend', 'Backend', 'Fullstack', 'Developer', 'Engineer',
      'UI', 'UX', 'Design', 'Responsive', 'Mobile', 'Web',
      'Component', 'Props', 'State', 'Event', 'Handler',
      'Callback', 'Closure', 'Scope', 'Hoisting', 'Binding',
      'Prototype', 'Inheritance', 'Polymorphism', 'Encapsulation',
      'Algorithm', 'Data', 'Structure', 'Array', 'Object',
      'String', 'Number', 'Boolean', 'Symbol', 'BigInt',
      'JSON', 'XML', 'YAML', 'Markdown', 'RegEx',
      '{ }', '[ ]', '( )', '< >', '=> ', '...', '&&', '||',
      '===', '!==', '++', '--', '+=', '-=', '*=', '/=',
      'npm', 'yarn', 'pnpm', 'webpack', 'vite', 'babel',
      'ESLint', 'Prettier', 'Jest', 'Testing', 'Debug',
      'Console', 'Log', 'Error', 'Warning', 'Info',
      'localhost', 'port', '3000', '8080', '5173',
      'http', 'https', 'ws', 'wss', 'tcp', 'udp',
      'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS',
      '200', '201', '400', '401', '403', '404', '500',
      'SEO', 'SSR', 'SSG', 'CSR', 'ISR', 'SPA',
      'PWA', 'CDN', 'DNS', 'SSL', 'TLS', 'CORS',
      'Auth', 'JWT', 'OAuth', 'Token', 'Session', 'Cookie',
    ];

    const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
    const streams: HTMLDivElement[] = [];

    const createStream = () => {
      if (!containerRef.current) return;

      const stream = document.createElement('div');
      stream.className = 'word-stream';
      
      const wordCount = 5 + Math.floor(Math.random() * 10);
      for (let i = 0; i < wordCount; i++) {
        const span = document.createElement('span');
        span.textContent = getRandomWord();
        span.style.opacity = String(0.3 + Math.random() * 0.7);
        stream.appendChild(span);
      }

      const duration = 15 + Math.random() * 25;
      const delay = -(Math.random() * duration);
      
      stream.style.left = `${Math.random() * 95}%`;
      stream.style.animationDuration = `${duration}s`;
      stream.style.animationDelay = `${delay}s`;
      stream.style.fontSize = `${10 + Math.random() * 4}px`;

      containerRef.current.appendChild(stream);
      streams.push(stream);

      const timeout = setTimeout(() => {
        if (stream.parentNode) {
          stream.remove();
        }
        const idx = streams.indexOf(stream);
        if (idx > -1) streams.splice(idx, 1);
        createStream();
      }, (duration + Math.abs(delay) + 2) * 1000);

      return timeout;
    };

    // Create initial streams
    const streamCount = 20;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < streamCount; i++) {
      const timeout = createStream();
      if (timeout) timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
      streams.forEach(stream => stream.remove());
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="word-rain-container" aria-hidden="true" />
  );
}
