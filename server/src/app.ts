import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"))
app.use(
    cors({
        origin:
            "http://localhost:5173",

        credentials: true,
    })
);
app.use(helmet());
app.use(cookieParser());


app.use("/api/v1", routes);


app.use(errorMiddleware)

export default app;