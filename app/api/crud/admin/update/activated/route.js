import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST(req) {


    const prisma = new PrismaClient()

    let {
        activated,
        id
    } = await req.json()


    if (activated === "oui") {
        activated = true
    } else {
        activated = false
    }


    const updatedNameUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            activated: activated
        }
    })

    if (updatedNameUser) {

        return NextResponse.json({ updatedNameUser })

    } else {
        return NextResponse.json({ error: "Une erreur est survenue !" })

    }


}