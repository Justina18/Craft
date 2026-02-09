import { motion } from "framer-motion";
import devIcon from "../../assets/figma-toolbar/dev.svg";
import { useCallback } from "react";

interface SwitchProps {
  isDev: boolean;
  setIsDev: (value: boolean) => void;
}

const SWITCH_TRANSITION = {
  ease: "easeInOut",
  duration: 0.15,
};

const Switch = ({ isDev, setIsDev }: SwitchProps) => {
  const toggle = useCallback(() => {
    setIsDev(!isDev);
  }, [isDev, setIsDev]);

  return (
    <div className="absolute right-0 flex h-full items-center justify-center rounded-r-[12px] border-l border-[#444444] bg-[#333333] px-3">
      <button
        type="button"
        role="switch"
        aria-checked={isDev}
        onClick={toggle}
        className={`flex h-6 w-10 items-center rounded-[4px] px-[1px] transition-colors ${isDev
            ? "bg-[#198F51] hover:bg-[#078348]"
            : "bg-[#383838] hover:bg-[#444444]"
          }`}
      >
        <motion.div
          layout
          transition={SWITCH_TRANSITION}
          className="flex h-[22px] w-[22px] items-center justify-center rounded-[4px] bg-[#333333] shadow-[0_0_2px_rgba(68,68,68,1)]"
        >
          <img src={devIcon} alt="Developer mode" />
        </motion.div>
      </button>
    </div>
  );
};

export default Switch;