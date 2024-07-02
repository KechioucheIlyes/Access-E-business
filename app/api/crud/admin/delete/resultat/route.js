import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    const { resultatID } = await req.json()



    const prisma = new PrismaClient()

    try {
        const deletedResult = await prisma.resultats.delete({
            where: {
                id: resultatID
            }
        })
        if (deletedResult) {
            return NextResponse.json({
                message: "Resultat supprimé avec succes !"
            }, { status: 200 })
        }
        else {
            return NextResponse.json({ message: "Erreur l'or de la suppression du resultat !" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur !" }, { status: 500 })
    }


}