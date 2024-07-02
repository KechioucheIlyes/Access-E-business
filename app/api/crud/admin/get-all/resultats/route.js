import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req) {

    const prisma = new PrismaClient()

    const resultats = await prisma.resultats.findMany({

        include: {
            etude: true
        }

    })

    if (resultats) {
        return NextResponse.json({ resultats })
    } else {
        return NextResponse.json({ message: "Erreur l'or de la recuperation des études !" })
    }

}