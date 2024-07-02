import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req) {
    const statued = false
    const { user_id } = await req.json()

    const prisma = new PrismaClient()

    if (!statued) {

        const user = await prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                confirmed: false,
                refused: true,
                activated: false
            }

        })
        if (user) {
            return NextResponse.json({
                message: 'Validé avec succès !'
            })
        }
        else {
            return NextResponse.json({
                message: "Une erreur est survenue l'or de la validation !"
            })
        }
    }


}