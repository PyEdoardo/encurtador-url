import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import { router } from "./routes/routes";

export const app = new App();

app.use(json());
app.use("/api", router);
