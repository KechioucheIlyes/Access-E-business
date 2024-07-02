import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {

    const { dirigeantID } = await req.json()

    const prisma = new PrismaClient()

    try {

        const deletedDirigeant = await prisma.dirigeants.delete({
            where: {
                id: dirigeantID
            }
        })


        if (deletedDirigeant) {
            return NextResponse.json({
                message: "Dirigeant Supprimé avec succes !"
            }, { status: 200 })
        }
        else {
            return NextResponse.json({ message: "Erreur l'or de la suppression du dirigeant !" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur !" }, { status: 500 })
    }



}