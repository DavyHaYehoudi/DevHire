import styled, { keyframes } from "styled-components";
import colors from "../utils/style/colors";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`;

const Loading = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`;

const Loader = () => {
  return <Loading></Loading>;
};

export default Loader;
