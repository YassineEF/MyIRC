import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  message,
} from "../src/interfaces/sockets";
import ReadLine from "readline";
import { commands, CommandMatching } from "../src/interfaces/commands";
import { stdin, stdout } from "process";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);
const rl = ReadLine.createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
});
socket.on("connect", () => {
  socket.on("sendWelcome", (message) => {
    console.log("Welcome user 🍌");
    console.log(message);
  });
  socket.on("sendPrivate", (message: message) =>
    console.log(`De ${message.username}\n`, message.message)
  );
  socket.on("sendListServer", (data: string[]) => {
    data.forEach((room: string) => console.log("room: " + room));
  });
  socket.on("sendmessageServer", (message: string) => console.log(message));

  rl.addListener("line", (input) => {
    const arg: string[] = input.split(" ");
    try {
      commands[arg[0] as keyof CommandMatching](socket, arg);
    } catch (err) {
      console.log("Command not found, use -help to list all commands");
    }
  });
});
