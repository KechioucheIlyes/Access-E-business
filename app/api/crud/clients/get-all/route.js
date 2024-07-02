
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { authOptions } from "./../../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
// recuperer tout les resultat

/**
 * @swagger
 * /api/crud/client/get-all:
 *   get:
 *     summary: Récupérer tous les clients
 *     description: Récupère tous les clients disponibles.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     responses:
 *       200:
 *         description: Tous les clients récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               allClients: [client1, client2, ...]
 *       500:
 *         description: Erreur serveur lors de la récupération de tous les clients.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération de tous les clients.
*     security:
 *       - BearerAuth: []
 */


export async function GET(req) {

    const session = await getServerSession(authOptions)
    const prisma = new PrismaClient()

    const allClients = await prisma.clients.findMany({
        where: {
            user_id: parseInt(session.user.id)
        },
        include: {
            Dirigeants: true,
            Etudes: {
                include: {
                    resultats: true
                }
            }

        }
    })

    if (allClients) {
        let ids_etudes = []


        allClients.map(el => {

            if (el.Etudes && el.Etudes.length > 0 && el.Etudes[0].id) {
                ids_etudes.push(parseInt(el.Etudes[0].id));
            }

        })



        const allResults = await prisma.resultats.findMany({
            where: {
                id_etudes: { in: ids_etudes }
            }
        })

        if (allResults) {
            return NextResponse.json({ allClients, allResults })
        } else {
            return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les Clients" })
        }


    } else {
        return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les Clients" })
    }

}
