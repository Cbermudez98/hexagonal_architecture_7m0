import express from "express";
import { userRouter } from "./infrastructure/httpAdapter/requestAdapter";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("Server running at port 3000");
});

// App para registro de usuarios y envio de correos

// Domain layer
// Only interfaces