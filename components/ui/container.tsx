import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Dodanie prop className (opcjonalny)
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`mx-auto max-w-[1280px] p-4 ${className}`}>{children}</div>
  );
};

export default Container;
