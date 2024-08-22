import http from "http";
import app from "./app";

const PORT = 4000;
let server: ReturnType<typeof http.createServer>;

const start = () => {
  server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export const stop = (callback: any) => server && server.close(callback);

start();
