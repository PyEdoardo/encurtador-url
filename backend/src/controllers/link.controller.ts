import type { Request, Response } from "@tinyhttp/app";
import type { Link } from "@prisma/client";
import { linkServices } from "../services/link.services";

export class LinkController {
    private linkService: linkServices;

    constructor() {
        this.linkService = new linkServices();
    }

    pegarLinksIdUser = async (req: Request, res: Response) => {
        const { id } = req.body;

        if (!id) {
            res.status(400).send("ID do Usuário faltando!");
        }
        const links: Link[] | [] = await this.linkService.todosOsLinksPorId(id);

        if (!links) {
            res.status(405).send([{}]);
        }

        res.status(200).json(links);
    };
}
