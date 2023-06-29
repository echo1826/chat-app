const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const db = require("./config/connection");
const route = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(express.json());
app.use(route);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on("send_message", (data) => {
        console.log(data);
        console.log(io.engine.clientsCount);
        socket.broadcast.emit("receive_message", {
            message: data.message,
            user: data.user,
            username: data.username,
        });
    });

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} has disconnected`);
    });

    socket.on("end", () => {
        socket.disconnect();
    });
});

db.once("open", () => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
