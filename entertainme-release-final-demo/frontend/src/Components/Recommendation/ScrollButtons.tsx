import React, { useState, useLayoutEffect } from "react";
import styles from "../Reccomendation/main.module.css";

interface ScrollButtonsProps {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ scrollRef }) => {
  const [scrollPosition, setScrollPosition] = useState(1);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(scrollRef.current?.scrollLeft || 0);
    };

    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  return (
    <div className={styles.butts}>
      {scrollPosition > 1 && <button onClick={scrollLeft}>Left</button>}
      {scrollRef.current &&
        scrollPosition <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 1 && (
          <button className={styles.right} onClick={scrollRight}>
            Right
          </button>
        )}
    </div>
  );
};

export default ScrollButtons;
