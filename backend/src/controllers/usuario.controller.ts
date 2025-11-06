import type { Usuario } from "@prisma/client";
import type { Request, Response } from "@tinyhttp/app";
import { UsuarioService, type UsuarioLogin } from "../services/usuario.service";

export class UsuarioController {
    private usuarioService: UsuarioService;
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async create(req: Request, res: Response): Promise<void> {
        const { nome, email, senha } = req.body;
        const usuario = await this.usuarioService.criarUsuario({
            nome,
            email,
            senha,
        });

        if (!usuario) res.status(500).send("Erro na criação do usuário");

        res.status(200).json(usuario);
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, senha }: UsuarioLogin = req.body;

        if (!email) {
            res.status(400).send("Email Faltando");
            return;
        }
        if (!senha) {
            res.status(400).send("Senha Faltando");
            return;
        }

        const login: Omit<Usuario, "senha"> | undefined =
            await this.usuarioService.login({
                email,
                senha,
            });

        if (!login) {
            res.status(404).send("Usuário não encontrado ou Senha Errada");
            return;
        }

        res.status(200).json(login);
        return;
    }
}
