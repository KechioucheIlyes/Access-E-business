
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/dirigeants/update/{slug}:
 *   put:
 *     summary: Mettre à jour un dirigeant
 *     description: Met à jour un dirigeant en fonction de l'ID spécifié avec les informations fournies.
 *     tags: [Dirigeants]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du dirigeant à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Données du dirigeant à mettre à jour
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
 *     responses:
 *       200:
 *         description: Dirigeant mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Dirigeant mis à jour avec succès !
 *       500:
 *         description: Erreur serveur lors de la mise à jour du dirigeant.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la mise à jour du dirigeant.
*     security:
 *       - BearerAuth: []
 */

export async function PUT(req, { params }) {

    const id = parseInt(params.slug)

    const {
        civilite,
        nom,
        prenom,
        date_naissance,
        email,
        mobile,
        fixe,
        fonction,
        signataire,
        decisionnaire,
        signature_fichier,

    } = await req.json()

    const prisma = new PrismaClient()

    const updatedDirigeant = await prisma.dirigeants.update({
        where: {
            id
        },
        data: {
            civilite,
            nom,
            prenom,
            date_naissance,
            email,
            mobile,
            fixe,
            fonction,
            signataire,
            decisionnaire,
            signature_fichier,

        }
    })

    if (updatedDirigeant) {
        return NextResponse.json({ message: "Dirigant mis à jours avec succes ! " })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la mise a jour du dirigant !" })
    }

}