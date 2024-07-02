import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {

    const prisma = new PrismaClient()

    const etudesSansResultat = await prisma.etudes.findMany({
        where: {
            resultats: {
                none: {}
            }
        }
    })

    if (etudesSansResultat) {
        return NextResponse.json({ etudesSansResultat })
    } else {
        return NextResponse.json({ message: "Erreur l'or de la recuperation des études !" })
    }
}