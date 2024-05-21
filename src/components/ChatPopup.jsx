import React, { Component, useEffect, useState } from "react";
import { Launcher } from "react-chat-window";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat } from "../api";
import { CommentReducer } from "../redux/Reducers/Comment";
import { AccountSelector } from "../redux/Selectors/Account";
import { CommentSelector } from "../redux/Selectors/Comment";

export default function ChatPopup() {
  const dispatch = useDispatch();
  const { socket, chat } = useSelector(CommentSelector);
  const { username, userID } = useSelector(AccountSelector);
  useEffect(() => {
    if (socket) {
      socket.emit("joinChat", userID);
    }
  }, [socket]);

  useEffect(() => {
    fetchChat(userID).then((res) => {
      const result = res.data.chat.map((item, index) => {
        return {
          author: item.userName === "ADMIN" ? "admin" : "me",
          type: "text",
          data: {
            text: item.content,
          },
        };
      });
      // console.log("result", result);
      dispatch(CommentReducer.actions.setChatState(result));
      // setMessageList(result);
    });
  }, [userID]);
  console.log("chat", chat);
  useEffect(() => {
    if (socket) {
      socket.on("sendChatToClient", (msg) => {
        dispatch(
          CommentReducer.actions.addChatState({
            author: msg.userName === "ADMIN" ? "admin" : "me",
            type: "text",
            data: {
              text: msg.content,
            },
          })
        );
        // console.log(msg);
        // setMessageList([...messageList]);
      });
      return () => socket.off("sendChatToClient");
    }
  }, [socket]);
  const _onMessageWasSent = (e) => {
    const createdAt = new Date().toISOString();
    socket.emit("createChat", {
      userName: username,
      createdAt,
      content: e.data.text,
      userID: userID,
    });
    // setMessageList({
    //   messageList: [...messageList, message],
    // });
  };
  const _sendMessage = (text) => {
    if (text.length > 0) {
      setMessageList({
        messageList: [
          ...messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  };
  return (
    <div>
      <div>
        <Launcher
          className="bg-primary"
          agentProfile={{
            teamName: "ADMIN",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={(e) => _onMessageWasSent(e)}
          messageList={chat}
          showEmoji
        />
      </div>
    </div>
  );
}
