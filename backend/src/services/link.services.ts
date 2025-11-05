import prisma from "../prisma/prisma";
import type { Link, Usuario } from "@prisma/client";

export class linkServices {
    todosOsLinks = async (): Promise<void> => {};

    todosOsLinksPorId = async (id: string): Promise<Link[] | []> => {
        const user: Usuario | null = await prisma.usuario.findUnique({
            where: {
                id,
            },
        });
        if (!user) return [];
        const links: Link[] | null = await prisma.link.findMany({
            where: {
                idUser: id,
            },
        });
        if (!links) return [];

        return links;
    };
}
