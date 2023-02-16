import styled from "styled-components";

export const Wrapper = styled.div`
    display:flex;
    height:100%;

    .owner-container{
        padding:20px 30px 20px 30px;
        background:#EFF0F2;
        width:50%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

    .owner-box{
        background: #fff;
        border-radius:20px;
        padding:25px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        min-width: 90%;
        min-height: 190px;
        justify-content: space-between;
    } 

    .owner-button{
        background:#4D9D74;
        border:none;
        border-radius:5px;
        color: #fff;
        font-size:16px;
        width: 100%;
        height: 100%;
        cursor:pointer;
    }

    .owner-button:hover{
        background:#6DB992;
    }
    .heading{
        h2{
            font-weight:bold;
            font-size:16px;
        }
    }
    img{
        width: 50%;
        height:auto;
        object-fit:cover;
    }


    @media screen  and (max-width: 720px){
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .owner-container{
            height: 50%;
            width: 100%;
        }
        img{
        height: 50%;
        width: 100%;
 
    }   
    }
`
