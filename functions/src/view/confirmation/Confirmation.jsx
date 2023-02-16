import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/common/navbar/Navbar'
import ch from "../../assets/carHouse.svg";
import bar from "../../assets/icons/bar.svg"

function Confirmation() {
    return (
        <>
            <Navbar />
            <Wrapper>
                <div className='main'>
                    <h1>
                        <img src={bar} style={{
                            position: "relative",
                            bottom: "20px",
                            left: "27px",
                            width: "25px"
                        }} />
                        u are ready to go!</h1>
                    <div className="text">
                        follow instructions from your host, park, and you are all set to
                        go!
                    </div>
                    <div className="text text-green">
                        check your email for confirmation, contact
                        <a href="mailto: manage@yugopark.com"> manage@yugopark.com</a> for
                        assistance
                    </div>
                    <img className='img-house' src={ch} />
                </div>
            </Wrapper>
        </>
    )
}

export default Confirmation

const Wrapper = styled.div` 
    height: calc(100% - 111px);
    background-color: #E4E4E4;
    .main{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1{
            font-size: 60px;
            margin: 0;
            color: #1B233C;
        }
        .text {
            text-align: center;
            font-size: 20px;
            color: #1a1818;
            line-height: 1;
        }
        .text-green {
            color: #79a182;
            a{
                color: #79a182;
            }
        }
        .img-house{    
            margin-top: 15px;
            height: 50%;
        }
    }
`