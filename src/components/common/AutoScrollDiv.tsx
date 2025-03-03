"use client";
import React, { useEffect, useRef } from "react";

interface AutoScrollDivProps extends React.HTMLAttributes<HTMLDivElement> {
  dependency: unknown[];
  children: React.ReactNode;
}

const AutoScrollDiv: React.FC<AutoScrollDivProps> = ({
  dependency = [],
  children,
  ...rest // This will capture all other props passed to the component
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, dependency);

  return (
    <div ref={scrollContainerRef} {...rest}>
      {children}
    </div>
  );
};

export default AutoScrollDiv;
