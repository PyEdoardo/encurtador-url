import { App } from "@tinyhttp/app";
import { app as RouterUsuario } from "./usuario.routes";
import { app as RouterLink } from "./link.routes";

export const router = new App();

router.use(RouterUsuario);
router.use(RouterLink);
