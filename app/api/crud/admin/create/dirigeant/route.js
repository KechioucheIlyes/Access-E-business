import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req, res) {

    const {
        nom,
        prenom,
        civilite,
        email,
        mobile,
        fixe,
        fonction,
        signataire,
        decisionnaire,
        clientID,
    } = await req.json()

    const prisma = new PrismaClient()

    try {
        const createdDirigeant = await prisma.dirigeants.create({
            data: {
                nom,
                prenom,
                civilite,
                email,
                mobile,
                fixe,
                fonction,
                signataire,
                decisionnaire,
                ID_clients: clientID
            }
        })

        if (createdDirigeant) {
            return NextResponse.json({
                message: "Le dirigeant a été créer avec succès !"
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                message: "Une erreur s'est produite l'or de la creation du dirigeant !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur serveur !"
        }, { status: 500 })
    }
}