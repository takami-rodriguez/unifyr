import { cn } from "@/lib/utils";
import React from "react";

interface AtlasHeroProps {
  title: string;
  className?: string;
}

const AtlasHero: React.FC<React.PropsWithChildren<AtlasHeroProps>> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-6 text-center', className)}>
      <h1 className="font-heading text-5xl font-bold md:text-7xl">{title}</h1>
      <p className="mx-auto max-w-3xl text-lg text-grey-900/80 md:text-xl">
        {children}
      </p>
    </div>
  );
};

export default AtlasHero;
