import styled from "styled-components";

const StyledModal = styled.div`
  margin-top: 5%;
  width: 80%;
  height: min-content;

  max-width: 650px;

  padding-bottom: 40px;

  background-color: var(--grey25);

  border-radius: 5px;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 20px;

  > form {
    width: 80%;

    display: flex;
    flex-direction: column;

    gap: 20px;
  }

  input {
    background-color: transparent;
    border-bottom: 1px solid var(--grey);

    color: var(--withe);

    padding: 5px;
  }

  .headerModal {
    width: 80%;
    background-color: var(--grey50);
    height: 40px;

    padding-left: 10%;
    padding-right: 10%;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        max-height: 30px;
        max-width: 30px;
      }
    }

    svg {
      color: var(--withe);

      min-width: 30px;
      min-height: 30px;
    }
  }

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

  label {
    font-size: 12px;
  }
  input[type="file"] {
    display: none;
  }
  .file {
    background-color: var(--withe);
    color: var(--total-black);
    width: 3.5rem;
    padding: 0.8rem;
    text-align: center;
    margin-right: 1rem;

    border-radius: 5px;
  }

  .boxFile {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--grey);

    padding-bottom: 0.5rem;

    padding-left: 0.4rem;

    p {
      font-size: 0.8rem;
      opacity: 35%;
    }
  }

  button {
    background-color: var(--colorbrand1);
    height: 30px;
    color: var(--withe);
    border-radius: 5px;
  }
`;

export const StyledModalBox = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;

  display: flex;
  justify-content: center;

  background-color: rgb(0, 0, 0, 0.8);

  bottom: 0;
  > div {
  }
`;
export default StyledModal;
