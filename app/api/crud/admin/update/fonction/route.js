import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST(req) {


    const prisma = new PrismaClient()

    const {
        fonction,
        id
    } = await req.json()


    if (fonction === '') {
        return NextResponse.json({ message: "Veuillez rentrez une fonction ici" }, { status: 401 })
    }
    const updatedNameUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            fonction
        }
    })

    if (updatedNameUser) {
        return NextResponse.json({ updatedNameUser })

    } else {
        return NextResponse.json({ error: "Une erreur est survenue !" })

    }


}