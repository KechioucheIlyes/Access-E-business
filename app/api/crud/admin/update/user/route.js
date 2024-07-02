import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const prisma = new PrismaClient()

    const {
        raisonSociale,
        nom,
        prenom,
        fonction,
        email,
        fixe,
        mobile,
        siren,
        roles,
        userID

    } = await req.json()


    console.log(raisonSociale,
        nom,
        prenom,
        fonction,
        email,
        fixe,
        mobile,
        siren,
        roles,
        userID)
    try {
        const userUpdated = await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                name: nom,
                prenom,
                raison_social: raisonSociale,
                email,
                fonction,
                fix: fixe,
                numero: mobile,
                siren,
                role: roles === 'Admin' ? "admin" : "user",
            }

        })
        if (userUpdated) {
            return NextResponse.json({
                userUpdated, message: "Utilisateur mis à jour !"
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                message: "Pas d'utilisateurs !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur serveur !"
        }, { status: 500 })
    }


}