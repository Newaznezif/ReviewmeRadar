import { useState, useEffect, useRef } from 'react';

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.unobserve(observeTarget);
  }, []);

  return [ref, dimensions];
};
