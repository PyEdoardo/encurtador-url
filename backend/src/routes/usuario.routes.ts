import { App } from "@tinyhttp/app";
import { UsuarioController } from "../controllers/usuario.controller";

const BASE_URL = "/usuario";
const controller = new UsuarioController();

export const app = new App();

//Login
app.post(`${BASE_URL}/login`, controller.login.bind(controller));

//Create
app.post(BASE_URL, controller.create.bind(controller));
