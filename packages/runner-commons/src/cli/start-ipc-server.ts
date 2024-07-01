import { UUVEvent, UUV_IPC_SERVER_NAME } from "../runner/event";

async function createIPCServer() {
    return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const ipcServer = require("node-ipc").default;
        ipcServer.config.id = UUV_IPC_SERVER_NAME;
        ipcServer.config.retry = 1500;
        ipcServer.config.silent = true;
        ipcServer.serve(() => {
            ipcServer.server.on("message", (message: UUVEvent) => {
                ipcServer.server.broadcast("message", message);
            });
            console.log("UUV Server Started");
            resolve(ipcServer);
        });
        ipcServer.server.start();
    });
}

createIPCServer();
