import React, { useState, useRef, useEffect } from "react";
import CountTo from "../CountTo";
import numbers from "data/IT/numbers.json";

const ICONS = [
   // 1) rocket
  <svg viewBox="0 0 24 24" aria-hidden="true" key="i3">
    <path
      d="M14 4c4 0 6 2 6 6-3 6-9 10-12 10-2 0-4-2-4-4 0-3 4-9 10-12Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M10 14l-2 2M14 10l2-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M8 16c.5 2-1 4-3 4 0-2 2-3.5 3-4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>,
 
  // 2) shield
  <svg viewBox="0 0 24 24" aria-hidden="true" key="i2">
    <path
      d="M12 2 20 6v7c0 5-3.4 8.7-8 9-4.6-.3-8-4-8-9V6l8-4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9 12l2 2 4-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
 
  // 3) Globe
  <svg viewBox="0 0 24 24" aria-hidden="true" key="i1">
    <path
      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.9"
    />
  </svg>,
];

const Numbers = () => {
  const numbersSectionRef = useRef(null);
  const [position, setPosition] = useState({ from: 0, to: 0 });

  useEffect(() => {
    const section = numbersSectionRef.current;
    if (!section) return;

    const height = section.offsetHeight;
    const top = section.offsetTop;

    setPosition({
      from: top - height - 300,
      to: top + height,
    });
  }, []);

  return (
    <section className="fv-stats bg-gray" ref={numbersSectionRef}>
      <div className="container">
        <div className="fv-stats__head">
          <h2 className="color-main text-uppercase fs-6">
            Trusted
          </h2>
          <h2 className="">
            Trusted by teams across the World
          </h2>
        </div>

        <div className="fv-stats__grid">
          {numbers.map((item, index) => (
            <article className="fv-stats__card" key={index}>
              <div className="fv-stats__top">
                <div className="fv-stats__icon" aria-hidden="true">
                  {ICONS[index % ICONS.length]}
                </div>

                <h3 className="fv-stats__number">
                  <CountTo
                    className="counter"
                    from={0}
                    to={item.value}
                    speed={1500}
                    position={position}
                  />
                  {item.operator ? (
                    <span className="fv-stats__op">{item.operator}</span>
                  ) : null}
                </h3>
              </div>

              <p className="fv-stats__label">
                {item.title.part1} <span className="fv-stats__break" />
                {item.title.part2}
              </p>

              <div className="fv-stats__shine" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numbers;
