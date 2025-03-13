// Container.tsx
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-[1280px] p-4">{children}</div>;
};

export default Container;
