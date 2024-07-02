import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req) {

    const {
        role,
        id
    } = await req.json()

    const prisma = new PrismaClient()


    const upadatedRoleUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            role
        }
    })

    if (upadatedRoleUser) {
        return NextResponse.json({ upadatedRoleUser })
    }
    else{
        return NextResponse.json({ error: "Une erreur est survenue !" })
    }


}