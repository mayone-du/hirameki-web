import { memo, useRef } from "react";

type Props = {
  tooltipText: string;
};

export const Tooltip: React.FC<Props> = memo((props) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "1";
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
  };
  return (
    <div
      className="flex relative items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex before:block absolute before:absolute top-full before:-top-1 left-1/2 before:left-1/2 z-10 before:z-0 items-center py-[2px] px-2 mx-auto mt-2 before:w-2 before:h-2 text-xs text-white whitespace-nowrap before:bg-black bg-black rounded transition-all duration-150 transform before:transform before:rotate-45 -translate-x-1/2 before:-translate-x-1/2"
        ref={ref}
      >
        {props.tooltipText}
      </div>
      {props.children}
    </div>
  );
});

Tooltip.displayName = "Tooltip";
