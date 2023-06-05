import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  overflow: hidden;

  .box_input {
    width: 80%;

    margin-top: 100px;
    margin-bottom: 100px;
  }
  .box_list {
    width: 80%;
  }

  .client {
    max-width: 900px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      width: 60px;
      padding: 10px;

      border-radius: 5px;

      background-color: var(--colorbrand1);
      color: var(--withe);
    }
  }
`;

export default StyledHome;
