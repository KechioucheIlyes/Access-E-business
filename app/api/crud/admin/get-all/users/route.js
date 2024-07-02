import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {
    const prisma = new PrismaClient()


    try {
        const users = await prisma.user.findMany({

        })

        if (users) {
            return NextResponse.json({
                users
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