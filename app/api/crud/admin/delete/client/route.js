import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function DELETE(req) {
    const prisma = new PrismaClient()

    const {
        clientID,
        user_id,
        etudes

    } = await req.json()



    try {

        const deletedEtudes = await prisma.etudes.deleteMany({
            where: {
                ID_clients: clientID
            }
        })



        const deletedDirigeants = await prisma.dirigeants.deleteMany({
            where: {
                ID_clients: clientID
            }
        })

        const deletedClient = await prisma.clients.delete({
            where: {
                id: clientID,
                user_id
            }
        })

        if (deletedClient && deletedEtudes && deletedDirigeants) {
            return NextResponse.json({
                message: "Client Supprimé avec succes !"
            }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Erreur l'or de la suppression du client !" }, { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur serveur !" }, { status: 500 })
    }



}