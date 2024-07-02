
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/dirigeants/create:
 *   post:
 *     summary: Créer un nouveau dirigeant
 *     description: Crée un nouveau dirigeant avec les informations fournies.
 *     tags: [Dirigeants]
 *     requestBody:
 *       description: Données du dirigeant à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               civilite:
 *                 type: string
 *                 description: Civilité du dirigeant
 *               nom:
 *                 type: string
 *                 description: Nom du dirigeant
 *               prenom:
 *                 type: string
 *                 description: Prénom du dirigeant
 *               date_naissance:
 *                 type: string
 *                 description: Date de naissance du dirigeant
 *               email:
 *                 type: string
 *                 description: Adresse e-mail du dirigeant
 *               mobile:
 *                 type: string
 *                 description: Numéro de téléphone mobile du dirigeant
 *               fixe:
 *                 type: string
 *                 description: Numéro de téléphone fixe du dirigeant
 *               fonction:
 *                 type: string
 *                 description: Fonction du dirigeant
 *               signataire:
 *                 type: boolean
 *                 description: Le dirigeant est-il signataire ?
 *               decisionnaire:
 *                 type: boolean
 *                 description: Le dirigeant est-il décisionnaire ?
 *               signature_fichier:
 *                 type: string
 *                 description: Fichier de signature du dirigeant
 *               ID_clients:
 *                 type: integer
 *                 description: ID du client associé au dirigeant
 *     responses:
 *       200:
 *         description: Dirigeant créé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Dirigeant créé avec succès !
 *       500:
 *         description: Erreur serveur lors de la création du dirigeant.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la création du dirigeant.
*     security:
 *       - BearerAuth: []
 */


export async function POST(req, { params }) {

    const ID_clients = parseInt(params.slug)

    const {

        civilite,
        nom,
        prenom,
        email,
        mobile,
        fixe,
        fonction,
        signataire,
        decisionnaire,
        signature_fichier,

    } = await req.json()


    const prisma = new PrismaClient()


    const createDirigant = await prisma.dirigeants.create({
        data: {
            civilite,
            nom,
            prenom,
            email,
            mobile,
            fixe,
            fonction,
            signataire,
            decisionnaire,
            signature_fichier,
            ID_clients
        }
    })

    if (createDirigant) {
        return NextResponse.json({ message: "Dirigeant créer avec succes !", nom_dirigeant: createDirigant.nom, id_dirigeant:createDirigant.id, fonction: createDirigant.fonction })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la creation du Dirigeant" })
    }

}