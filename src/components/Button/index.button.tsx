import { motion } from "framer-motion";

const Button = ({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type: "button" | "reset" | "submit" | undefined;
  className?: string;
}) => {
  return (
    <motion.button
      whileTap={{
        opacity: 0.5,
        transition: {
          duration: 0.2,
        },
      }}
      className={className}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Button;
