import styled from "styled-components";

const StyledModalFile = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;

  .loop {
    width: 20px;
    height: 20px;
    max-width: 20px;
    max-height: 20px;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  > div {
    justify-content: space-between;

    margin-top: 5%;
    width: 70%;
    height: min-content;

    max-width: 650px;

    padding-bottom: 40px;

    border-radius: 5px;

    background-color: var(--grey25);

    > div {
      height: 40px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      background-color: var(--grey50);

      border-radius: 5px 5px 0 0;

      padding-inline: 5%;

      svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  .foto {
    border-radius: 5px;

    background-color: rgb(98, 60, 234, 0.1);
    outline: 1px solid var(--colorbrand1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;

    text-align: center;

    padding: 10px;

    max-width: calc(4rem - 1px);
    max-height: calc(2rem - 1px);

    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 90%;
    padding-inline: 5%;
    padding-top: 5%;
    input {
      display: none;
    }

    > .boxFile {
      border-bottom: solid var(--grey) 1px;

      padding: 1px 0 0.4rem 0;
      padding-inline: 5%;

      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row-reverse;

      overflow: hidden;
    }

    .boxButtons {
      width: 100%;

      display: flex;
      justify-content: space-between;

      padding: 1px;
    }

    .add {
      width: 100%;
      height: 2rem;

      border-radius: 5px;

      color: var(--withe);
      background-color: var(--colorbrand1);
    }
  }

  button {
    cursor: pointer;
  }
`;

export default StyledModalFile;
