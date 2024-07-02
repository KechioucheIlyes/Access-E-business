import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST(req) {


    const prisma = new PrismaClient()

    const {
        name,
        id
    } = await req.json()





    const updatedNameUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            name
        }
    })

    if (updatedNameUser) {

        return NextResponse.json({ updatedNameUser })

    } else {
        return NextResponse.json({ error: "Une erreur est survenue !" })

    }


}