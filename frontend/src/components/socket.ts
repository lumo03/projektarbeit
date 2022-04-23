import { io, Socket as SocketIOClient } from "socket.io-client";

export default class Socket {
  private socket: SocketIOClient;
  private socketId: string;

  constructor() {
    this.socket = io(/*"localhost:8000"*/ "192.168.178.104:8000", {
      transports: ["websocket", "polling"],
    });
    this.socketId = "";
    this.socket.on("connect", () => {
      this.setId(this.socket.id);
    });
  }

  public connect() {
    this.socket = io(/*"localhost:8000"*/ "192.168.178.104:8000", {
      transports: ["websocket", "polling"],
    });
    this.socketId = "";
    this.socket.on("connect", () => {
      this.setId(this.socket.id);
    });
  }

  public getRoom() {
    let room: string | null = null;
    this.emit("get_room_id", (roomId: string) => (room = roomId));
    return room ?? "";
  }

  private setId(id: string) {
    this.socketId = id;
    this.socket.id = id;
  }

  public getId() {
    return this.socketId;
  }

  public getSocket() {
    return this.socket;
  }

  public on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  public emit(event: string, data: any, ...args: any[]) {
    this.socket.emit(event, data, ...args);
  }
}
