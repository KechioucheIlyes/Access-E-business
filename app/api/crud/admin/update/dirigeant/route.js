import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function PUT(req) {

    const prisma = new PrismaClient()

    const {
        nom,
        prenom,
        civilite,
        email,
        mobile,
        fixe,
        fonction,
        clientID,
        signataire,
        decisionnaire,
        dirigeantID
    } = await req.json()

    try {
        const editedDirigeant = await prisma.dirigeants.update({
            where: {
                id: dirigeantID
            },
            data: {
                nom,
                prenom,
                civilite,
                email,
                mobile,
                fixe,
                fonction,
                ID_clients: clientID,
                signataire,
                decisionnaire
            }
        })

        if (editedDirigeant) {
            return NextResponse.json({
                message: 'Dirigeant modifié avec Succès !'
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la modification du dirigeant !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur l'or de la modification du dirigeant !"
        }, { status: 500 })
    }

}