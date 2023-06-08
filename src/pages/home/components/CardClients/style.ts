import styled from "styled-components";

const StyleCardClient = styled.ul`
  width: 100%;
  height: max-content;
  max-width: 900px;

  padding-right: 2%;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 450px;

  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background-color: var(--grey25);

    background: transparent; /* color of the tracking area */
  }

  .delete {
    svg {
      width: 20px;
      height: 20px;
    }
    color: var(--withe);
  }

  .funcs {
    display: flex;
    gap: 10px;
  }

  li {
    width: 100%;
    list-style: none;

    border-bottom: 2px var(--grey25) solid;

    margin-bottom: 5px;

    .boxContent {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user {
        display: flex;
        align-items: center;

        padding-bottom: 10px;

        gap: 1rem;

        svg {
          color: var(--withe);
          width: 30px;
          height: 30px;
        }

        img {
          border-radius: 100%;
          width: 30px;
          height: 30px;
        }
      }
    }

    .open {
      color: var(--withe);
    }

    button {
      background: none;

      transition: 0.3s;
    }

    @media screen and (min-width: 43.75rem) {
    }
  }

  .contacts {
    width: 100%;

    margin-top: 40px;

    border-bottom: solid 1px var(--grey25);

    overflow-x: hidden;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;

    .button {
      width: 70px;
      height: 30px;

      color: var(--withe);

      border-radius: 5px;
      background-color: var(--colorbrand1);
    }

    p {
      width: 100%;
    }

    h3 {
      width: 100%;
    }

    .boxInfos {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;

      .infoHeader {
        width: 100%;

        display: flex;
        align-items: center;
        margin-bottom: 30px;
      }

      .infos {
        width: 95%;
        display: flex;
        flex-direction: column;

        gap: 10px;
      }
    }

    .boxContacts {
      width: 100%;
      display: flex;
      flex-direction: row;

      align-items: center;

      margin-bottom: 50px;
      gap: 10px;
    }

    > ul {
      width: 95%;
      margin-bottom: 200px;

      > li {
        display: flex;
        justify-content: space-between;

        width: 90%;
        max-width: 500px;

        > div {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          flex-direction: row;

          margin-right: 5%;
        }

        > h4 {
          margin-left: 5%;
        }

        svg {
          width: 20px;
          height: 20px;

          color: var(--withe);
        }
      }
    }

    p {
      font-size: 14px;
    }
  }
`;

export default StyleCardClient;
