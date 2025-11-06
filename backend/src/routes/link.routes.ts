import { App } from "@tinyhttp/app";
import { LinkController } from "../controllers/link.controller";

const BASE_URL = "/link";
const controller = new LinkController();

export const app = new App();

//Get links by user
app.post(`${BASE_URL}/user`, controller.pegarLinksIdUser.bind(controller));

//Get all links
app.get(BASE_URL, controller.pegarLinks.bind(controller));
