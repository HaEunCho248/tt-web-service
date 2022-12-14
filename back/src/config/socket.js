import socket from "socket.io";
import { chat } from "../models/chat";

const socketConfig = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // ๐ app.get("/rooms", (req, res) => {
  // room title ๊ฐ์ ธ์ค๊ธฐ
  //   res.json(rooms);
  //endpoint์๋๊ฑฐ๋ router ๋ฐ๋ก ํ ์
  // });
  const getLastMessagesFromRoom = async ({ challengeId }) => {
    // ๋ฃธ ํ์ดํ์ ํด๋นํ๋ ๋ฉ์ธ์ง ๋ชจ๋ ๊ฐ์ ธ์ค๊ธฐ
    const data = await chat.getMessage({ challengeId });
    return data;
  };
  function sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
      let date1 = a.date.split("/");
      let date2 = b.date.split("/");
      date1 = date1[2] + date1[0] + date1[1];
      date2 = date2[2] + date2[0] + date2[1];
      return date1 < date2 ? -1 : 1;
    });
  }
  function aggregateM(roomMessages) {
    const result = [];
    let count = 0;

    for (let i = 0; i < roomMessages.length; i++) {
      if (i === 0) {
        result.push({
          _id: roomMessages[i].date,
          messagesByDate: [roomMessages[0]],
        });
        continue;
      } else if (roomMessages[i - 1].date == roomMessages[i].date) {
        result[count].messagesByDate.push(roomMessages[i]);
      } else {
        result.push({
          _id: roomMessages[i].date,
          messagesByDate: [roomMessages[i]],
        });
        count += 1;
      }
    }
    console.log("result๊ตฌ์กฐํ์์ฉ!", result);
    return result;
  }

  //์์ผ์ฐ๊ฒฐ
  io.on("connection", (socket) => {
    socket.on("new-user", (socket) => {
      // const members = await User.find();
      // io.emit("new-user", members);
      // console.log(members);
      console.log(socket);
    });
    socket.on("enterRoom", async (room) => {
      socket.join(room);
      console.log("room", room);
      console.log("room", socket.rooms);
      // ๋ฃธ;
      
      // ๋ฃธ ํ์ดํ์ ํด๋นํ๋ ๋ชจ๋  ๋ฉ์ธ์ง ๊ฐ์ ธ์จ ํ์ ๋ฐ์ดํฐ ์ ๋ ฌํ๊ณ  ๊ทธ๊ฑฐ ํ๋ก ํธ์ ๋ณด๋ด๊ธฐ
      const challengeId = await chat.findChallenge({ room });

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      roomMessages = sortRoomMessagesByDate(roomMessages);
      let allMessages = aggregateM(roomMessages);
      socket.emit("room-messages", allMessages);
    });
    socket.on("messageRoom", async (room, content, sender, time, date) => {
      const userId = sender.userId;
      const name = sender.name;
      const challengeId = await chat.findChallenge({ room });
      const chatData = {
        challengeId,
        content,
        userId,
        name,
        time,
        date,
      };

      const data = await chat.storeChat({ chatData });

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      roomMessages = sortRoomMessagesByDate(roomMessages);
      let allMessages = aggregateM(roomMessages);
      // sending message to room
      io.to(room).emit("room-messages", allMessages);
      socket.broadcast.emit("notifications", room);
    });
  });
};
export { socketConfig };
