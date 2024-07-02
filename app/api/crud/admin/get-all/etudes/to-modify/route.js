import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req) {

    const prisma = new PrismaClient()

    const etudes = await prisma.etudes.findMany({

        include: {
            Clients: true
        }

    })

    if (etudes) {
        return NextResponse.json({ etudes })
    } else {
        return NextResponse.json({ message: "Erreur l'or de la recuperation des études !" })
    }

}