import { useContext, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import StyleInputSeach from "./style";
import { AuthContext } from "../../../../context/authContext/index.context";
import { iClients } from "../../../../context/authContext/interface";

const magnificGlass =
  "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z";

export const svg = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={magnificGlass}></path>
  </svg>
);

const InputSeach = () => {
  const [backup, setBackup] = useState([] as iClients[]);
  const [text, setText] = useState("");

  const { listClients, setListClients } = useContext(AuthContext);

  const close = () => {
    setListClients(backup);
    setBackup([]);
    setText("");
  };
  const filter = () => {
    const array = listClients.filter(
      (e) =>
        e.name.toLocaleLowerCase().slice(0, text.length) ==
        text.toLocaleLowerCase()
    );
    setBackup(listClients);
    setListClients(array);
  };
  return (
    <StyleInputSeach>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Pesquisar cliente"
      />

      <button
        onClick={() => (backup.length ? close() : filter())}
        type="button"
      >
        {!backup.length ? svg : <AiFillCloseCircle />}
      </button>
    </StyleInputSeach>
  );
};

export default InputSeach;
