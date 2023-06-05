import styled from "styled-components";

const StyleInputSeach = styled.div`
  width: min-content;
  border-bottom: 2px solid var(--grey25);
  display: flex;
  justify-content: center;

  width: 80%;

  max-width: 250px;

  input {
    background: none;
    padding: 10px;

    width: 80%;

    color: var(--withe);
  }

  button {
    background: none;

    svg {
      width: 20px;
      height: 20px;

      color: var(--withe);
    }

    margin-right: 10px;
  }
`;

export default StyleInputSeach;
