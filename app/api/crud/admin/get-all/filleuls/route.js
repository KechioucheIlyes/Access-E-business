import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req) {
    const prisma = new PrismaClient()


    try {
        const allFilleuls = await prisma.filleul.findMany({
            include: {
                Commission_filleul: true,
                User : true,
            }
        })


        if (allFilleuls) {
            return NextResponse.json({
                allFilleuls
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                message: "Erreur l'or de la recuperation des filleuls"
            }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur serveur !"
        }, { status: 500 })
    }







}