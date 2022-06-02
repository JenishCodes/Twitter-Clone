import api from "./api";
import {
  addDoc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
  doc,
  collection,
  limit,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { store } from "../config/firebase";

export async function getChatMessages(chatId, page, userId = null) {
  try {
    const q = query(
      collection(store, "messages"),
      where("chatId", "==", chatId),
      orderBy("createdAt", "desc")
      // startAt(page * 20),
      // limit(20)
    );

    const res = await getDocs(q);

    const messages = res.docs
      .map((d) => {
        return { ...d.data(), _id: d.id };
      })
      .reverse();

    if (userId) {
      const user = await api.get("/user/show?user_id=" + userId);

      return {
        user: user.data,
        data: messages,
      };
    } else {
      return {
        data: messages,
      };
    }
  } catch (err) {
    throw err;
  }
}

export async function sendMessage(message) {
  try {
    const res = await addDoc(collection(store, "messages"), {
      ...message,
      createdAt: serverTimestamp(),
    });

    await setDoc(
      doc(store, "chats", message.chatId),
      {
        userIds: message.chatId.split("~"),
        lastMessageId: res.id,
      },
      { merge: true }
    );
  } catch (err) {
    throw err;
  }
}

export async function deleteMessage(messageId) {
  try {
    // const res = await deleteDoc(doc(store, "messages", messageId));
    // const lastMessage = await getDocs(
    //   query(
    //     collection(store, "messages"),
    //     where("chatId", "==", res.chatId),
    //     orderBy("createdAt", "desc"),
    //     limit(1)
    //   )
    // );

    // await updateDoc(doc(store, "chats", res.chatId), {
    //   lastMessageId: lastMessage.docs[0].id,
    // });

    // return res;
  } catch (err) {
    throw err;
  }
}
