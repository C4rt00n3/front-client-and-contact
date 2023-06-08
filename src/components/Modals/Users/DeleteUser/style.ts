import styled from "styled-components";

const StyledDeleteUser = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgb(0, 0, 0, 0.5);

  position: fixed;

  display: flex;
  justify-content: center;

  top: 0;

  > div {
    margin-top: 5%;
    width: 70%;
    height: min-content;

    background-color: var(--grey25);
    padding-bottom: 3rem;
    border-radius: 5px;

    max-width: 650px;

    display: flex;
    flex-direction: column;

    button {
      width: 40%;

      border-radius: 5px;
      padding: 10px;
    }
    .headerModal {
      height: 40px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding-inline: 5%;
      background-color: var(--grey50);

      border-radius: 5px 5px 0 0;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  .boxContent {
    padding-inline: 5%;

    p {
      margin-top: 2rem;
    }

    display: flex;
    flex-direction: column;

    gap: 2rem;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default StyledDeleteUser;
