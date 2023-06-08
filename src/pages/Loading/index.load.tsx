import StyledLoading from "./style";
import { motion } from "framer-motion";
import logo from "../../assets/logo-customers.svg";
import intesLogo from "../../assets/vectors.svg";
import { useEffect, useState } from "react";

const Loading = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((e) => e + 1);
    }, 400);
  }, [count]);

  const mude = (n = count) => {
    if (n % 2 == 0) {
      return true;
    }

    return false;
  };

  return (
    <StyledLoading>
      <img src={logo} alt="" />

      <motion.div>
        <motion.img
          initial={{ scale: mude(count) ? 0.1 : 1 }}
          whileInView={{
            scale: !mude(count) ? 0.1 : 1,
            transition: {
              duration: 0.4,
            },
          }}
          src={intesLogo}
          alt="logotipo"
        />
      </motion.div>
    </StyledLoading>
  );
};

export default Loading;
