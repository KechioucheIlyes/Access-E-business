import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req) {

    const {
        nom,
        prenom,
        email,
        numero,
        raisonSociale,
        fonction,
        siren,
        fixe,
        userID
    } = await req.json()


    const prisma = new PrismaClient()

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userID,
            },
            data: {
                name: nom,
                prenom,
                email,
                numero,
                raison_social: raisonSociale,
                fonction,
                siren,
                fix: fixe,
                modifier_le: new Date()
            }
        })


        if (updatedUser) {
            return NextResponse.json({
                message: 'Les informations ont été mise a jour avec succes !'
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Les informations n'ont pas été mise a jour !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Les informations n'ont pas été mise a jour !"
        }, { status: 500 })
    }


}