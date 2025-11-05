-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT,
    "criadoQuando" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoQuando" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "urlOriginal" TEXT NOT NULL,
    "codigoCurto" TEXT NOT NULL,
    "titulo" TEXT,
    "criadoQuando" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoQuando" TIMESTAMP(3) NOT NULL,
    "contagemClicks" INTEGER NOT NULL DEFAULT 0,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "idLink" TEXT NOT NULL,
    "criadoQuando" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "agenteUser" TEXT,
    "referer" TEXT,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Link_codigoCurto_key" ON "Link"("codigoCurto");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_idLink_fkey" FOREIGN KEY ("idLink") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
