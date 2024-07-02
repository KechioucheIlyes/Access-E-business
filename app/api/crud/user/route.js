import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

export async function GET(req) {
    const prisma = new PrismaClient()
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))

    console.log(id)
    if (id) {
        const user = await prisma.user.findFirst({
            where: {
                id
            },
            include: {
                Commissions: true,
                Clients: true,
                filleul: true
            }
        })

        if (user) {
            return NextResponse.json({
                user, commission: user.Commissions.length, client: user.Clients.length, filleul: user.filleul.length
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la recuperation de vos informations"
            }, { status: 400 })
        }
    } else {
        console.log('else')
        return NextResponse.json({
            message: "Erreur l'or de la recuperation de vos informations"
        }, { status: 400 })
    }

}