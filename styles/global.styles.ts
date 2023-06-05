import { createGlobalStyle } from "styled-components";

const StyleGlobal = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

    *{
        padding: 0;
        margin: 0;
    }
    :root{

        --total-black:${({ theme }) => theme.colors.totalBlack}; 
        --grey100:${({ theme }) => theme.colors.grey100};
        --grey50:${({ theme }) => theme.colors.grey50};
        --grey25:${({ theme }) => theme.colors.grey25};
        --grey:${({ theme }) => theme.colors.grey};
        --withe:${({ theme }) => theme.colors.withe};
        --total-withe:${({ theme }) => theme.colors.totalWithe};
        --green:${({ theme }) => theme.colors.green};
        --blue:${({ theme }) => theme.colors.blue};
        --colorbrand1:${({ theme }) => theme.colors.colorbrand1};

        --background: var(--dusk);
        --accent: var(--white);



        --Font12: 0.75rem;
        --Font14: 0.875rem;
        --Font16: 1rem;
        --Font18: 1.125rem;
        --Font20: 1.25rem;
        --Font24: 1.5rem;
        --Font28: 1.75rem;
        --Font32: 2rem;
        --Font12: 2.25rem;

    }

    textarea:focus, input:focus, select:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    } 

    body{

        background-color: var(--total-black);
        color:  var(--withe);

        font-family: 'Red Hat Mono', monospace;
    };

    input, textarea{
        border: none;
        resize: none;
        box-shadow: none;
    }

    button{
        border: none;
    }

    html{
        scroll-behavior: smooth;
    }

    * { margin: 0; padding: 0; font-family: arial, helvetica, sans-serif; }
`;

export default StyleGlobal;
