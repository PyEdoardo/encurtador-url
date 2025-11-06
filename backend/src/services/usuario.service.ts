import prisma from "../prisma/prisma";

import type { Usuario } from "@prisma/client";

export type UsuarioLogin = Omit<
    Usuario,
    "id" | "criadoQuando" | "atualizadoQuando" | "nome"
>;

export class UsuarioService {
    constructor() {}

    async criarUsuario({
        nome,
        email,
        senha,
    }: Omit<Usuario, "id" | "criadoQuando" | "atualizadoQuando">): Promise<
        Omit<Usuario, "senha" | "criadoQuando" | "atualizadoQuando">
    > {
        const senhaCripto = await Bun.password.hash(senha);
        const usuario: Omit<
            Usuario,
            "senha" | "criadoQuando" | "atualizadoQuando"
        > = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCripto,
            },
            select: {
                senha: false,
                id: true,
                nome: true,
                email: true,
                criadoQuando: false,
                atualizadoQuando: false,
            },
        });

        return usuario;
    }

    async login({
        email,
        senha,
    }: UsuarioLogin): Promise<Omit<Usuario, "senha"> | undefined> {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email,
            },
        });

        if (!usuario) return undefined;

        const senhaCripto = usuario?.senha;
        const validado: boolean = await Bun.password.verify(senha, senhaCripto);

        if (!validado) return undefined;

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            atualizadoQuando: usuario.atualizadoQuando,
            criadoQuando: usuario.criadoQuando,
        };
    }
}
