
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /votre-sixieme-endpoint:
 *   put:
 *     summary: Mettre à jour un client
 *     description: Met à jour les informations d'un client en fonction de l'ID spécifié.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du client à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouvelles données du client
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siret:
 *                 type: string
 *                 description: Numéro SIRET du client
 *               raison_sociale:
 *                 type: string
 *                 description: Raison sociale du client
 *               code_naf:
 *                 type: string
 *                 description: Code NAF du client
 *               adresse_postal:
 *                 type: string
 *                 description: Adresse postale du client
 *               ville:
 *                 type: string
 *                 description: Ville du client
 *               code_postal:
 *                 type: string
 *                 description: Code postal du client
 *               user_id:
 *                 type: integer
 *                 description: ID de l'utilisateur associé au client
 *     responses:
 *       200:
 *         description: Client mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Client mis à jour avec succès !
 *       500:
 *         description: Erreur serveur lors de la mise à jour du client.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la mise à jour du client.
*     security:
 *       - BearerAuth: []
 */


export async function PUT(req, { params }) {

    const id = parseInt(params.slug)

    const {
        siret,
        raison_sociale,
        code_naf,
        adresse_postal,
        ville,
        code_postal,
        user_id,
    } = await req.json()

    const prisma = new PrismaClient()

    const updatedClient = await prisma.clients.update({
        where: {
            id
        },
        data: {
            siret,
            raison_sociale,
            code_naf,
            adresse_postal,
            ville,
            code_postal,
            user_id,
        }
    })

    if (updatedClient) {
        return NextResponse.json({ message: "Client mise à jours avec succes ! " })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la mise a jour du Client !" })
    }

}