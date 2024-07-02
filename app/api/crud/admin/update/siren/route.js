import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST(req) {


    const prisma = new PrismaClient()

    const {
        siren,
        id
    } = await req.json()



    if (siren === '') {
        return NextResponse.json({ message: "Veuillez rentrez une raison sociale ici" }, { status: 401 })
    }
    const updatedNameUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            siren
        }
    })

    if (updatedNameUser) {

        return NextResponse.json({ updatedNameUser })

    } else {
        return NextResponse.json({ error: "Une erreur est survenue !" })

    }


}