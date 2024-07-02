import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function POST(req) {


    const prisma = new PrismaClient()

    const {
        tel,
        id
    } = await req.json()


    if (tel === '') {
        return NextResponse.json({ message: "Veuillez rentrez un mail ici" }, { status: 401 })
    }
    const updatedNameUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            numero: tel
        }
    })

    if (updatedNameUser) {

        return NextResponse.json({ updatedNameUser })

    } else {
        return NextResponse.json({ error: "Une erreur est survenue !" })

    }


}