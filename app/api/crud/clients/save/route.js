import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



/**
 * @swagger
 * /api/crud/clients/save:
 *   post:
 *     summary: enregistrer un nouveau client
 *     description: enregistrer un nouveau client avec les informations fournies.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     requestBody:
 *       description: Données du client à enregistrer
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
 *         description: Client enregistrer avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Client enregistrer avec succès !
 *       500:
 *         description: Erreur serveur lors de l'enregistrement du client.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de l'enregistrement du client.
*     security:
 *       - BearerAuth: []
 */



export async function POST(req, { params }) {

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

    const createClient = await prisma.clients.create({
        data: {
            siret,
            raison_sociale,
            code_naf,
            adresse_postal,
            ville,
            code_postal,
            user_id
        }

    })
    if (createClient) {
        return NextResponse.json({
            message: "Client creer avec succès !"
        },
            {
                status: 200
            })
    }
    else {
        return NextResponse.json({
            message: "Echec l'ors de la creation de la Client !"
        })
    }



}