import React, { useEffect, useState } from "react";
import List from "../components/List";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { timeFormatter } from "../utils";
import { Helmet } from "react-helmet-async";
import { getConversations } from "../services/conversation";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getConversations()
      .then((res) => setConversations(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="messages">
      <Helmet>
        <title>Messages / Twitter</title>
      </Helmet>

      <Header
        title="Messages"
        subtitle={conversations.length + " Conversations"}
      />

      {conversations.length > 0
        ? conversations.map((conversation, index) => (
            <List
              key={index}
              className="hover pointer"
              onClick={() =>
                navigate("/messages/" + conversation.user._id, {
                  state: { user: conversation.user },
                })
              }
              data={{
                image_url: conversation.user.profile_image_url,
                title: conversation.user.name,
                context: (
                  <div className="oneline text-muted">
                    {conversation.lastMessage}
                  </div>
                ),
              }}
              actionButton={
                <div className="text-muted">
                  {timeFormatter(conversation.updatedAt, "Ago")}
                </div>
              }
            />
          ))
        : !loading && (
            <div className="text-center text-muted mt-5">No messages yet</div>
          )}

      <Loading show={loading} className="my-5 text-app" />

      {conversations.length > 0 && <div className="h-25-vh"></div>}
    </div>
  );
}
