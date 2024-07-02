import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Opérations liées aux Clients
 */

/**
 * @swagger
 * /api/crud/clients/{slug}:
 *   get:
 *     summary: Obtenir les détails d'un client
 *     description: Récupère les détails d'un client en fonction de l'ID spécifié.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du client à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du client récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               getClients: { clientDetails }
 *       404:
 *         description: Client non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Client non trouvé.
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: Erreur lors de la récupération des données du client.
*     security:
 *       - BearerAuth: []
 */


export async function GET(req, { params }) {


    const id = parseInt(params.slug)

    const prisma = new PrismaClient()
    
    

    const getClients = await prisma.clients.findUnique({
        where: {
            id
        }
    })

    if (getClients) {
        return NextResponse.json({ getClients })
    }
    else {
        return NextResponse.json({ message: "Erreur l'ors de la recuperation de la commission" })
    }

}