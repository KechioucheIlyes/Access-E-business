import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(req) {

    const prisma = new PrismaClient()

    const { passwordRes, id } = await req.json()


    console.log(passwordRes, id)


    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            authentication: true
        }
    })

    if (user) {

        const hashedPassword = bcrypt.hashSync(passwordRes, 10)
        console.log(hashedPassword)
        console.log(user.authentication.id)
        const userUpdated = await prisma.authentication.update({
            where: {
                id: user.authentication.id
            },
            data: {
                password: hashedPassword
            }
        })


        if (userUpdated) {
            return NextResponse.json({
                message: "Mot de passe mis à jour",
                maj:true
            })
        } else {
            return NextResponse.json({
                message: "Erreur",
                maj : false
            })
        }
    } else {
        return NextResponse.json({
            message: "Erreur",
            maj : false
        })
    }




}