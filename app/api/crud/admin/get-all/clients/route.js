
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function GET(req) {



    const prisma = new PrismaClient()



    const verifiedClients = await prisma.user.findMany({
        where: {
            activated: true,
            confirmed: true
        },
        include: {
            Clients: true
        }
    })


    if (verifiedClients) {
        return NextResponse.json({
            verifiedClients
        }, { status: 200 })
    } else {
        return NextResponse.json({
            message: "Une erreur s'est produite veuillez reessayer plus tard !"
        }, { status: 404 })
    }
}