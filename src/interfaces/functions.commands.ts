import { ClientToServerEvents } from "./sockets";

class Commands implements ClientToServerEvents {
  constructor() {}

  sendLogin(socket: any, arg: any) {
    socket.emit("sendLogin", {
      username: arg[2],
      password: arg[4],
      id_socket: socket.id,
    });
  }
  sendRegister(socket: any, data: any[]) {
    socket.emit("sendRegister", {
      username: data[2],
      password: data[4],
    });
  }
  sendMessagePrivate(socket: any, data: any[]) {
    const message = data.slice(3).join(" ");
    socket.emit("sendMessagePrivate", {
      username: data[1],
      message,
    });
  }
  showAllMember(socket: any, arg: any) {
    socket.emit("showAllMember");
    socket.on("showAllMemberRes", (data: any[]) => {
      data.forEach((member: any) => console.log(member.username));
    });
  }
  sendCreateRoom(socket: any, arg: any) {
    socket.emit("sendCreateRoom", { room: arg[1] });
  }
  sendJoinRoom(socket: any, arg: any) {
    socket.emit("sendJoinRoom", {
      room: arg[1],
    });
  }
  sendMessageRoom(socket: any, arg: any) {
    const message = arg.slice(1).join(" ");
    socket.emit("sendMessageRoom", message);
  }
  sendListRoom(socket: any, arg: any) {
    socket.emit("sendListRoom", arg[1]);
  }
  sendExportMessageWithDate(socket: any, arg: any) {
    socket.emit("sendExportMessageWithDate", {
      old_date: arg[2],
      recent_date: arg[4],
    });
  }
  sendExportMessageUser(socket: any, arg: any) {
    socket.emit("sendExportMessageUser", { username: arg[2] });
  }
  sendExportMyMessage(socket: any, arg: any) {
    socket.emit("sendExportMyMessage");
  }
  sendChangePassword(socket: any, arg: any) {
    socket.emit("sendChangePassword", { username: arg[2], password: arg[4] });
  }
  sendHelp(socket: any, arg: any) {
    console.log(`
    ## Commands line ref

#### Register and login

\`\`\`http
  -l -u \`username\` -p \`password\`
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`-l\` | \`string\` | **Required** use this command for login |
| \`-r\` | \`string\` | **Required** use this command for register |
| \`-u\` | \`string\` | **Required** enter ur username |
| \`-p\` | \`string\` | **Required** enter ur username |

#### Send private message

\`\`\`http
  -mp \`receiver\` -m \`message\`
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-mp\`      | \`string\` | **Required**. send private message |
| \`receiver\`      | \`string\` | **Required**. enter the name of receiver |
| \`-m\`      | \`string\` | **Required**. write ur message after this command |

#### Send message to room

\`\`\`http
  -mr \`message\`
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-mr\`      | \`string\` | **Required**. send message to room|
| \`message\`      | \`string\` | **Required**. write ur message.|


#### View list

\`\`\`http
  -list
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-list\`      | \`string\` | **Required**. return all user connected|
| \`--list_room\`      | \`string\` | **Required**. return all room created|
| \`-help\`      | \`string\` | **Required**. return all commands|

#### Command room

\`\`\`http
  -cr \`room\`
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-cr\`      | \`string\` | **Required**. create room and join her|
| \`-jr\`      | \`string\` | **Required**. join the room|
| \`room\`      | \`string\` | **Required**. name of the room|


#### Command export message

\`\`\`http
  -em_find -b \`date_before\` -n \`date_after\`
\`\`\`
\`\`\`http
  -em_u -u \`name\`
\`\`\`

\`\`\`http
  -em_m
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-em_find\`      | \`string\` | **Required**. comand for export message between to date|
| \`-em_u\`      | \`string\` | **Required**. comand for export message user|
| \`-b\` | \`string\` | **Required**. enter date after this command|
| \`-n\`| \`string\` | **Required**. enter date after this command|
| \`date_before\`| \`string\` | **Required**. old date enter like this : **AAAA-MM-DD** |
| \`date_after\`| \`string\` | **Required**. recent date enter like this : **AAAA-MM-DD** |

#### Command admin

\`\`\`http
  -em_find -b \`date_before\` -n \`date_after\`
\`\`\`
\`\`\`http
  -em_u -u \`name\`
\`\`\`
\`\`\`http
  -cp -u \`name\` -p \`new_password\`
\`\`\`
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`-em_u\`      | \`string\` | **Required**. comand for export message user|
| \`-u\` | \`string\` | **Required**. name of user|
| \`-cp\` | \`string\` | **Required**. change password|
| \`-p\` | \`string\` | **Required**. name of user|
| \`new_password\` | \`string\` | **Required**. new password|`);
  }
}
export const command = new Commands();
