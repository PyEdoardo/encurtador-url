import { App } from "@tinyhttp/app"
import { json } from "milliparsec"
import routes from "./routes"

export const app = new App();

app.use(json());
app.use('/api', routes);