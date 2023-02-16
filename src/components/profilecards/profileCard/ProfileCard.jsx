import React from 'react'
import styled from 'styled-components'
import profilepicture from "../../assets/images/furqan.jpg"

function ProfileCard({Name,Likes,Followers,Email,MemberSince,Gender,Status}) {
    return (
        <Wrapper>
            <div className='profileContainer'>

                <div className='topContainer'>

                    <div >
                        <img className='profilePicture' src={profilepicture}/>
                    </div>

                    <div className='name'>
                        {Name}
                    </div>

                    <div className='followers'>
                        {` ${Likes} Followers | ${Followers} Likes`}
                    </div>

                </div>

                <div className='bottomContainer'>

                    <div className='headingContianer'>

                        <div className='about'>
                            ACOUNT DETAILS
                        </div>

                        <div className='line'></div>
                    </div>

                    <div className='otherInfo'>
                        <div className='detail'>
                            <h4>
                                Email:
                            </h4>
                            <span>
                                {Email}
                            </span>
                        </div>
                        <div className='detail'>
                            <h4>
                                Member Since:
                            </h4>
                            <span>
                                {MemberSince}
                            </span>
                        </div>
                        <div className='detail'>
                            <h4>
                                Gender:
                            </h4>
                            <span>
                                {Gender}
                            </span>
                        </div>
                        <div className='detail'>
                            <h4>
                                Status
                            </h4>
                            <span>
                                {Status}
                            </span>
                        </div>
                    </div>


                </div>


            </div>
        </Wrapper>
    )
}

export default ProfileCard

const Wrapper = styled.div `
padding:20px;
display:flex;
align-items:center;
justify-content:center;

.topContainer{
  display:flex;
  flex-direction:column;
  align-items:center;
}

.profileContainer{
  width:500px;
  background:#283151;
  height:600px;
  border-radius:20px;
  padding:30px;
}

.profilePicture{
  width:200px;
  height:200px;
  border-radius:50%;
  border: 4px solid #fff;
}

.name{
  font-size:24px;
  color:white;
  font-weight:bold;
  margin:20px 0px 2px  0px;
}

.followers{
  font-size:12px;
  color:white;
}

.headingContianer{

  display:flex;
  justify-content:space-between;
  align-items:center;
  margin:40px 0px 20px 0px;

  .about{
    color:#fff;
    margin-right:20px;
    opacity:0.5;

  }
  .line{
    width:70%;
    background:#b2b2b2;
    opacity:0.5;
    height:0.2px;
  }

}
.otherInfo{

  .detail{
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#fff;
    border-bottom: 0.2px solid #b2b2b2;
    padding:10px 0px;
    h4{
      margin:0px;
      color:#fff;
      font-weight:bold;
    }
    span{
      font-size:12px;
    }
  }
}

`
