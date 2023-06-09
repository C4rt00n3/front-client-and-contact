import styled from "styled-components";

const StyledLogin = styled.div<{ img: string }>`
  width: 90%;
  height: 100%;

  margin-left: 5%;

  .load {
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

  input {
    background: none;
    height: 40px;

    border-bottom: 1px solid;
    border-color: var(--grey50);
    color: var(--withe);
  }

  .boxForm {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-bottom: 30px;
      font-weight: 900;
      font-size: 22px;
    }

    > img {
      margin-top: 5%;
      margin-bottom: 7%;

      max-height: 45px;
    }

    > form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        > label {
          font-size: 14px;
        }
        small {
          font-size: 0.6rem;
          color: red;
          margin: 0;
        }
      }
    }
  }

  button {
    margin-top: 20px;
    margin-bottom: 15px;

    background-color: var(--colorbrand1);

    color: var(--withe);

    border-radius: 5px;

    height: 40px;
  }

  small {
    font-size: 0.8rem;
    margin-bottom: 40px;
  }

  @media screen and (min-width: 43.75rem) {
    > img {
      margin-top: 10%;
      margin-bottom: 5%;
    }
  }

  @media screen and (min-width: 1000px) {
    > img {
      margin-top: 10%;
      margin-bottom: 5%;
    }
    .boxForm {
      max-width: 45%;
    }

    .imageBox {
      position: absolute;

      width: 45%;
      height: 100%;

      right: 0;
      top: 0;
      bottom: 0;

      background-image: url(${({ img }) => img});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export default StyledLogin;
