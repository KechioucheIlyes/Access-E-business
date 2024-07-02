import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "./../../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth";



/**
 * @swagger
 * /api/crud/clients/create:
 *   post:
 *     summary: Créer un nouveau client
 *     description: Crée un nouveau client avec les informations fournies.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     requestBody:
 *       description: Données du client à créer
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
 *         description: Client créé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Client créé avec succès !
 *       500:
 *         description: Erreur serveur lors de la création du client.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la création du client.
*     security:
 *       - BearerAuth: []
 */



export async function POST(req, { params }) {

    const session = await getServerSession(authOptions)


    const user_id = parseInt(session?.user?.id)

    const {
        siret,
        raison_sociale,
        code_naf,
        adresse_postal,
        ville,
        code_postal,
        secteur_activite,
        nom_entreprise,
        forme_juridique
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
            secteur_activite,
            nom_entreprise,
            forme_juridique,
            user_id

        },



    })
    if (createClient) {
        return NextResponse.json({
            message: "Client creer avec succès !", id_client: createClient.id
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