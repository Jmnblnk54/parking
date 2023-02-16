import { CometChat } from "@cometchat-pro/chat";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Navbar from "../../components/common/navbar/Navbar";
import { COMETCHAT_CONSTANTS } from "../../config/comet-config.js";
import { CometChatUI } from "../../view/cometchat-pro-react-ui-kit-master/CometChatWorkspace/src";

export default function HostMessages() {
  const [isInitialized, setIsInitialized] = useState(false);
  const userId = localStorage.getItem("USERID");
  const [chatWithUser, setChatWithUser] = useState("");
  const [currentUserId, setCurrentUSERID] = useState("");
  const location = useLocation();
  const [tId, setTID] = useState("");
  console.log("travelerID", location?.state?.travelerID);
  useEffect(() => {
    if (userId) {
      var appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .build();

      CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
        () => {
          if (CometChat.setSource) {
            CometChat.setSource("ui-kit", "web", "reactjs");
            // console.log("OWN USER", userId)
            CometChat.login(userId, COMETCHAT_CONSTANTS?.AUTH_KEY)
              .then((user) => {
                console.log(userId);
                setIsInitialized(true);
                let limit = 30;
                let conversationRequest =
                  new CometChat.ConversationsRequestBuilder()
                    .setLimit(limit)
                    .build();
                conversationRequest.fetchNext().then((conversationList) => {
                  if (conversationList?.length > 0) {
                    if (!currentUserId) {
                      setChatWithUser(
                        conversationList[0]?.getConversationWith?.uid
                      );
                    }
                  }
                });
              })
              .catch((error) => {
                if (error.code === "ERR_UID_NOT_FOUND") {
                  console.log("Error", error.code);
                  const uid = userId;
                  // console.log("UID", uid)
                  let name = "HOST";
                  // let image = data.data.user?.image;
                  var user = new CometChat.User(uid);
                  user.setName(name);
                  // if (image) {
                  //     user.setAvatar(image);
                  // }
                  CometChat.createUser(
                    user,
                    COMETCHAT_CONSTANTS?.AUTH_KEY
                  ).then(
                    (user) => {
                      CometChat.login(
                        userId,
                        COMETCHAT_CONSTANTS?.AUTH_KEY
                      ).then((user_) => {
                        setIsInitialized(true);
                        console.log("HOST LOGIN", user_);
                      });
                    },
                    (error) => {
                      console.log("ERROR", error);
                    }
                  );
                }
              });
          }
        },
        (error) => {}
      );
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setCurrentUSERID(userId);
    }
  }, [userId]);

  // console.log("Opposite USER", location.state.travelerID, "OWN ID", userId);
  return (
    isInitialized && (
      <Wrapper>
        <Navbar />
        <div className="chat-main">
          <CometChatUI
            conversationWith={userId}
            chatWithUser={location?.state?.travelerID}
          />
        </div>
      </Wrapper>
    )
  );
}

export const Wrapper = styled.div`
  height: 100%;
  background: #eff0f2;
  width: 100%;
  .chat-main {
    height: calc(100% - 114px);
  }
  @media screen and (max-width: 999px) {
    .chat-main {
      height: calc(100% - 77px);
    }
  }
`;
