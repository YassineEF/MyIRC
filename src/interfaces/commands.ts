import { command } from "./functions.commands";

export interface CommandMatching {
  "-l": (socket: any, object: any) => void;
  "-r": (socket: any, object: any) => void;
  "-mp": (socket: any, object: any) => void;
  "-list": (socket: any, object: any) => void;
  "-cr": (socket: any, object: any) => void;
  "-jr": (socket: any, object: any) => void;
  "-mr": (socket: any, object: any) => void;
  "-list_room": (socket: any, object: any) => void;
  "-em_find": (socket: any, object: any) => void;
  "-em_u": (socket: any, object: any) => void;
  "-em_m": (socket: any, object: any) => void;
  "-cp": (socket: any, object: any) => void;
  "-help": (socket: any, object: any) => void;
}

export const commands: CommandMatching = {
  "-l": command.sendLogin,
  "-r": command.sendRegister,
  "-mp": command.sendMessagePrivate,
  "-list": command.showAllMember,
  "-cr": command.sendCreateRoom,
  "-jr": command.sendJoinRoom,
  "-mr": command.sendMessageRoom,
  "-list_room": command.sendListRoom,
  "-em_find": command.sendExportMessageWithDate,
  "-em_u": command.sendExportMessageUser,
  "-em_m": command.sendExportMyMessage,
  "-cp": command.sendChangePassword,
  "-help": command.sendHelp,
};
