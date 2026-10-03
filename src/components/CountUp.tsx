import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  duration?: number;
}

const CountUp = ({ value, duration = 1400 }: Props) => {
  const target = parseInt(value.replace(/\D/g, ''), 10);
  const isNumeric = /^[\d\s\u00a0]+$/.test(value) && !Number.isNaN(target);
  const [n, setN] = useState(isNumeric ? 0 : target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isNumeric, target, duration]);

  return <span ref={ref}>{isNumeric ? n.toLocaleString('ru-RU') : value}</span>;
};

export default CountUp;
