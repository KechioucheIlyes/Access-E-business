import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req) {

    const prisma = new PrismaClient()


    try {
        const etudes = await prisma.etudes.findMany({
            where: {
                contrats: {
                    none: {}
                }
            },
            include: {
                contrats: true
            }
        })
        if (etudes) {
            return NextResponse.json({ etudes }, { status: 200 })
        } else {
            return NextResponse.json({ message: "erreur ! " }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ message: "erreur serveur ! " }, { status: 500 })
    }

}