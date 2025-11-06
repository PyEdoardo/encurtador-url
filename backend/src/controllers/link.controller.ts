import type { Request, Response } from "@tinyhttp/app";
import type { Link } from "@prisma/client";
import { linkServices } from "../services/link.service";

export class LinkController {
    private linkService: linkServices;

    constructor() {
        this.linkService = new linkServices();
    }

    async pegarLinksIdUser(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).send("ID do Usuário faltando!");
        }
        const links: Link[] | [] = await this.linkService.todosOsLinksPorId(id);

        res.status(200).json(links);
    }

    async pegarLinks(req: Request, res: Response): Promise<void> {
        const links: Link[] | [] = await this.linkService.todosOsLinks();

        res.status(200).json(links);
    }
}
