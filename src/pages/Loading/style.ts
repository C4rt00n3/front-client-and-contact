import styled from "styled-components";

const StyledLoading = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    position: absolute;

    bottom: 5%;
    left: 5%;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 3rem;
    height: 3rem;

    background-color: var(--colorbrand1);

    border-radius: 5px;
    > img {
      width: 90%;
    }
  }
`;

export default StyledLoading;
