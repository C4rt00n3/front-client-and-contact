import { FaUserCircle } from "react-icons/fa";

const ClientImg = ({ image }: { image?: string }) => {
  return <>{image ? <img src={image} alt="" /> : <FaUserCircle />}</>;
};

export default ClientImg;
