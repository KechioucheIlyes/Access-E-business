
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/contrats/save/{slug}:
 *   put:
 *     summary: Mettre à jour un contrat
 *     description: Met à jour un contrat en fonction de l'ID spécifié avec les informations fournies.
 *     tags: [Contrats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du contrat à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Données du contrat à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference_contrat:
 *                 type: string
 *                 description: Référence du contrat
 *               nom_site:
 *                 type: string
 *                 description: Nom du site associé au contrat
 *               fournisseur:
 *                 type: string
 *                 description: Fournisseur du contrat
 *               date_echeance:
 *                 type: string
 *                 description: Date d'échéance du contrat
 *               type_contrat:
 *                 type: string
 *                 description: Type de contrat
 *               fichier_contrat:
 *                 type: string
 *                 description: Fichier du contrat
 *               id_etudes:
 *                 type: integer
 *                 description: ID de l'étude associée au contrat
 *     responses:
 *       200:
 *         description: Contrat mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Contrat mis à jour avec succès !
 *       500:
 *         description: Erreur serveur lors de la mise à jour du contrat.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la mise à jour du contrat.
*     security:
 *       - BearerAuth: []
 */

export async function PUT(req, { params }) {

    const id = parseInt(params.slug)

    const {
        reference_contrat,
        nom_site,
        fournisseur,
        date_echeance,
        type_contrat,
        fichier_contrat,
        id_etudes
    } = await req.json()

    const prisma = new PrismaClient()



    const updatedContrat = await prisma.contrats.update({
        where: {
            id
        },
        data: {
            reference_contrat,
            nom_site,
            fournisseur,
            date_echeance,
            type_contrat,
            fichier_contrat,
            id_etudes
        }
    })

    if (updatedContrat) {
        return NextResponse.json({ message: "Contrat mis à jours avec succes ! " })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la mise a jour du Contrat !" })
    }

}