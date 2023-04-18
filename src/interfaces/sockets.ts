export interface ServerToClientEvents {
  sendmessageServer: (s: string) => void;
  sendListServer: (arr: string[]) => void;
  sendWelcome: (s: string) => void;
  sendPrivate: (obj: message) => void;
  showAllMemberRes: (arr: any[]) => void;
}

export interface ClientToServerEvents {
  sendRegister: (socket: any, arg: any) => void;
  sendLogin: (socket: any, arg: any) => void;
  sendMessagePrivate: (socket: any, arg: any) => void;
  showAllMember: (socket: any, arg: any) => void;
  sendCreateRoom: (socket: any, arg: any) => void;
  sendJoinRoom: (socket: any, arg: any) => void;
  sendMessageRoom: (socket: any, arg: any) => void;
  sendListRoom: (socket: any, arg: any) => void;
  sendExportMessageWithDate: (socket: any, arg: any) => void;
  sendExportMessageUser: (socket: any, arg: any) => void;
  sendExportMyMessage: (socket: any, arg: any) => void;
  sendChangePassword: (socket: any, arg: any) => void;
  sendHelp: (socket: any, arg: any) => void;
}

export interface SocketData {
  name: string;
}
export interface message {
  username: string;
  message: string;
}
