import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import fs from "fs";
import db from "./db/db";
import Users from "../models/Users";
import Messages from "../models/Messages";
import Groups from "../models/Groups";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../interfaces/sockets";
import bcrypt from "bcrypt";
const port = process.env.PORT;
const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(
  Number(port)
);
const saltRounds = 10;
const utilisateurs: any[] = [];
const usersCo: any[] = [];
const allRooms: string[] = [];

Users.find().then((members: any) => {
  members.forEach((el: any) => {
    utilisateurs.push({ id: el._id, name: el.name, isAdmin: el.isAdmin });
  });
});

db(process.env.DB_USER, process.env.DB_PASSWORD);

io.on("connection", (socket) => {
  socket.emit(
    "sendWelcome",
    "use -l -u username -p password for login or -r -u username -p password for register"
  );

  socket.on("sendRegister", (data) => {
    console.log(data);
    bcrypt.hash(data.password, saltRounds, function (err: any, hash: any) {
      const user = new Users({ name: data.username, password: hash });
      user
        .save()
        .then((res: any) => {
          utilisateurs.push({
            id: res._id,
            name: res.name,
            isAdmin: res.isAdmin,
          });
          console.log("New register " + res.name);
          socket.emit("sendmessageServer", `User "${data.username}" created !`);
        })
        .catch((err) =>
          socket.emit(
            "sendmessageServer",
            `User "${data.username}" allready create or invalid data !`
          )
        );
    });
  });

  socket.on("sendLogin", (data) => {
    Users.findOne({ name: data.username })
      .then((res: any) => {
        bcrypt.compare(
          data.password,
          res.password,
          function (err: any, result: any) {
            console.log(result);
            if (result === true) {
              socket.emit("sendmessageServer", `Bienvenue ${res.name}`);
              usersCo.push({
                id_socket: data.id_socket,
                username: res.name,
              });
              socket.data = {
                username: res.name,
                isAdmin: res.isAdmin,
                room: socket.id,
              };
              console.log(usersCo);
              console.log(socket.data);
            } else {
              socket.emit(
                "sendmessageServer",
                `Name or password don't match, retry`
              );
            }
          }
        );
      })
      .catch((err: any) => console.log(err));
  });

  socket.on("sendMessagePrivate", (data) => {
    usersCo.forEach((user) => {
      if (data.username === user.username) {
        socket.broadcast.to(user.id_socket).emit("sendPrivate", {
          username: socket.data.username,
          message: data.message,
        });
        Users.findOne({ name: data.username })
          .then((rec: any) => {
            Users.findOne({ name: socket.data.username })
              .then((send: any) => {
                const message = new Messages({
                  message: data.message,
                  sender: send._id,
                  reciver: rec._id,
                });
                message
                  .save()
                  .then(() => console.log("Message envoyé! "))
                  .catch((error: any) => console.log(error));
              })
              .catch((err: any) => {
                console.log(err);
              });
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  });
  socket.on("sendCreateRoom", (data) => {
    socket.join(data.room);
    allRooms.push(data.room);
    console.log(`paperino ${socket.data.username}`);

    console.log(`Room ${data.room} created !`);
    io.to(data.room).emit(
      "sendmessageServer",
      `Room ${data.room} created and jump in`
    );

    Users.findOne({ name: socket.data.username })
      .then((rec: any) => {
        const group = new Groups({
          name: data.room,
          createdBy: rec._id,
        });
        group
          .save()
          .then(() => console.log(`Room ${data.room} created in bdd!`))
          .catch((error: any) => console.log(error));
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
  socket.on("sendJoinRoom", (data) => {
    socket.join(data.room);
    io.to(data.room).emit(
      "sendmessageServer",
      `${socket.data.username} Join the room ${data.room}`
    );
    socket.data = { ...socket.data, room: data.room };
  });
  socket.on("sendMessageRoom", (message: string) => {
    console.log(socket.data.room);

    io.to(socket.data.room).emit(
      "sendmessageServer",
      `De ${socket.data.username}\n ${message}`
    );
    Users.findOne({ name: socket.data.username })
      .then((send: any) => {
        Groups.findOne({ name: socket.data.room })
          .then((gro: any) => {
            const messages = new Messages({
              message: message,
              sender: send._id,
              group: gro._id,
            });
            messages
              .save()
              .then(() => console.log("Message envoyé! "))
              .catch((error: any) => console.log(error));
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
  socket.on("sendListRoom", () => {
    socket.emit("sendListServer", allRooms);
  });
  socket.on("showAllMember", () => socket.emit("showAllMemberRes", usersCo));
  socket.on("sendExportMessageWithDate", (data) => {
    Messages.find({
      createdAt: {
        $gte: new Date(data.old_date),
        $lte: new Date(data.recent_date),
      },
    })
      .then((res: any) => {
        console.log(res);

        fs.writeFile(
          `./exports/messages/historiquebetween${data.old_date}&${data.recent_date}by${socket.id}.json`,
          JSON.stringify(res, null, 2),
          (err) => console.log(err)
        );
        socket.emit(
          "sendmessageServer",
          `File save in folder exports/messages\n name: historiquebetween${data.old_date}&${data.recent_date}by${socket.id}.json`
        );
      })
      .catch((err: any) => console.log(err));
  });
  if (socket.data.isAdmin === true) {
    socket.on("sendExportMessageUser", (data) => {
      Users.findOne({ name: data.username })
        .then((rec: any) => {
          Messages.find({ $or: [{ sender: rec._id }, { reciver: rec._id }] })
            .then((res: any) => {
              fs.writeFile(
                `./exports/messages/clients/historique${rec.name}by${socket.id}.json`,
                JSON.stringify(res, null, 2),
                (err) => console.log(err)
              );
              socket.emit(
                "sendmessageServer",
                `File save in folder exports/messages/clients\n name: historique${rec.name}by${socket.id}.json`
              );
            })
            .catch((err: any) => console.log(err));
        })
        .catch((err: any) => {
          socket.emit("sendmessageServer", err);
        });
    });
    socket.on("sendChangePassword", (data) => {
      bcrypt.hash(data.password, saltRounds, (err: any, hash: any) => {
        Users.updateOne(
          { name: data.username },
          {
            $set: { password: hash },
          }
        )
          .then(() => {
            socket.emit(
              "sendmessageServer",
              `Password of ${data.username} changed!`
            );
          })
          .catch((err) => console.log(err));
      });
    });
  }
  socket.on("sendExportMyMessage", () => {
    Users.findOne({ name: socket.data.username })
      .then((rec: any) => {
        Messages.find({ $or: [{ sender: rec._id }, { reciver: rec._id }] })
          .then((res: any) => {
            fs.writeFile(
              `./exports/messages/data/historique${rec.name}by${socket.id}.json`,
              JSON.stringify(res, null, 2),
              (err) => console.log(err)
            );
            socket.emit(
              "sendmessageServer",
              `File save in folder exports/messages/data\n name: historique${rec.name}by${socket.id}.json`
            );
          })
          .catch((err: any) => console.log(err));
      })
      .catch((err: any) => {
        socket.emit("sendmessageServer", err);
      });
  });
});
