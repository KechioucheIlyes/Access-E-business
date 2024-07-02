
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function GET(req) {

    const prisma = new PrismaClient()

    const clients = await prisma.clients.findMany({
        include: {
            Dirigeants: true,
            User: true,
            Etudes: true
        },
        orderBy: {
            id: "desc"
        }
    })

    if (clients) {

        return NextResponse.json({
            clients
        }, { status: 200 })
    } else {
        return NextResponse.json({
            message: "Une erreur s'est produite veuillez reessayer plus tard !"
        }, { status: 404 })
    }
}