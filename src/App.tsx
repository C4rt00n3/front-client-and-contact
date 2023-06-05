import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";
import RoutesMain from "./routes/routes";
import StyleGlobal from "../styles/global.styles";
import { AuthContext } from "./context/authContext/index.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { theme } = useContext(AuthContext);
  return (
    <>
      <ThemeProvider theme={theme ? light : dark}>
        <StyleGlobal />
        <RoutesMain />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
