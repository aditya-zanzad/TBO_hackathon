import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Middleware for parsing requests
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
import userrouter from "./routes/user.routes.js";
import itineraryrouter from "./routes/itinerary.routes.js";
import hotelrouter from "./routes/Hotel.routes.js";  // Import your hotel routes

app.use("/api/v1/user", userrouter);
app.use("/api/v1/itinerary", itineraryrouter);
app.use("/api/v1/hotel", hotelrouter);  // Add hotel routes

// HTTP server
const server = createServer(app);

// Setting up Socket.IO
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Socket.IO connection event
io.on("connection", (socket) => {
    console.log("A user connected");

    // Example of a custom event listener
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Starting the server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export { app };
