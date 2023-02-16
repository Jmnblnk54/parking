import styled from "styled-components";

export const Wrapper = styled.div`

display:flex;
flex-direction: column;
height:100%;
.spots{
    display: flex;
    height: 100%;
}
.spots-container{
    padding:20px 30px 20px 30px;
    background:#EFF0F2;
    width:50%;
    overflow-y: scroll auto;

}
.list-button{
        background:#4D9D74;
        padding:6px 30px;
        border:none;
        border-radius:10px;
        color: #fff;
        font-size:14px;
        cursor:pointer;
        margin-bottom: 20px;
}

.list-button:hover{
    background:#6DB992;
}
.heading{
    h2{
        font-weight:bold;
    }
}


@media screen and (max-width: 900px){
    .spots{
    display: flex;
    flex-direction: column;
    height: 100%;

    }
    .spots-container{
        width: 100%;
        height: 50%;
    overflow-y: scroll;
    }
}


`
