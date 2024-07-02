import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {

    const prisma = new PrismaClient()

    try {
        const dirigeants = await prisma.dirigeants.findMany()


        if (dirigeants) {
            return NextResponse.json({
                dirigeants
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la recuperation des dirigeants !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur Serveur ! "
        }, { status: 500 })
    }




}