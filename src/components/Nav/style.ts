import styled from "styled-components";

const StyledNav = styled.div`
  width: 100vw;
  height: 50px;
  background-color: var(--grey50);

  position: fixed;

  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    width: 80%;
    justify-content: space-between;

    nav {
      width: 100px;
      background-color: var(--grey25);
      position: absolute;

      display: flex;
      flex-direction: column;

      border-radius: 5px;

      p {
        font-size: 0.8rem;
        padding: 3px;
      }
    }
  }

  svg {
    width: 30px;
    height: 30px;

    color: var(--total-withe);
  }

  .my {
    width: 30px;
    height: 30px;

    border-radius: 50%;
  }

  img {
    width: 35px;
    height: 35px;
  }

  button {
    background-color: transparent;
  }

  @media screen and (min-width: 43.75rem) {
    background-color: var(--grey50);

    width: 50px;
    height: 100%;

    right: 0;
    top: 0;
    bottom: 0;

    left: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      position: absolute;
      bottom: 50px;

      border-radius: 5px;

      display: flex;
      align-items: center;

      img {
        width: 400px;
        width: 40px;
      }
    }

    .userButton_ {
      width: 30px;
      height: 30px;
      .userButton {
        width: 30px;
        height: 30px;

        border-radius: 100%;

        color: var(--total-withe);
      }

      display: flex;
      align-items: center;

      background-color: var(--total-black);

      border-radius: 100%;
    }

    .home {
      width: 30px;
      height: 30px;

      background-color: transparent;

      > svg {
        width: 100%;
        height: 100%;

        color: var(--total-withe);
      }
    }

    > div {
      display: flex;
      flex-direction: column;

      gap: 50px;

      margin-top: -80px;
    }
  }

  button {
    width: min-content;
  }
`;

export default StyledNav;
