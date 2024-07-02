import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req) {

    const prisma = new PrismaClient()

    const etudes = await prisma.commissions.findMany({

        where: {
            Etudes: {
                some: {
                },

            },
        },
        include: {
            Etudes: {
                include: {
                    Clients: true,
                    resultats: true,
                }
            },
            User: true
        }

    })

    if (etudes) {
        return NextResponse.json({ etudes })
    } else {
        return NextResponse.json({ message: "Erreur l'or de la recuperation des études !" })
    }

}