import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {


    const prisma = new PrismaClient()

    const {
        contratID,
    } = await req.json()

    try {
        const contratModified = await prisma.contrats.delete({
            where: {
                id: contratID
            }
        })
        if (contratModified) {
            return NextResponse.json({ message: "Contrat supprimé avec success !" }, { status: 200 })
        } else {
            return NextResponse.json({ error: "Une erreur est survenue veuillez reessayer plus tard ! " }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Erreur Serveur !" }, { status: 500 })
    }

}