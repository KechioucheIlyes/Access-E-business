import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"



export async function POST(req) {
    const prisma = new PrismaClient()


    const { raisonSociale, nom, prenom, fonction, email, fixe, mobile, role, siren } = await req.json()

    const password = `${nom}${prenom}123`
    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                name: nom,
                prenom: prenom,
                email: email,
                numero: mobile,
                fix: fixe,
                raison_social: raisonSociale,
                fonction: fonction,
                role: role === 'Admin' ? "admin" : "user",
                siren: siren,
                activated: true,
                confirmed: true,
                authentication: {
                    create: {
                        password: hashedPassword
                    }
                }
            }
        })

        if (user) {
            return NextResponse.json({
                message: "Utilisateur créer avec succes !"
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la création de l'utilisateur !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur serveur !"
        }, { status: 500 })
    }

}