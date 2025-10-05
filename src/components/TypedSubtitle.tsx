import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export function TypedSubtitle() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: [
        'Writer of Sad Music',
        'Some of it isnt that sad',
        'But I mean,^500 calling a spade a spade',
        'Writer of Sad Music'
      ],
      typeSpeed: 30,
      backSpeed: 20,
      backDelay: 2000,
      loop: false,
      showCursor: true,
      cursorChar: '.',
      autoInsertCss: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <span 
      ref={el}
      className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed"
    />
  );
}
