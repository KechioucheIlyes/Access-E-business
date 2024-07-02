import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/commissions/delete/{slug}:
 *   delete:
 *     summary: Supprimer une commission
 *     description: Supprime une commission en fonction de l'ID spécifié.
 *     tags: [Commission]  # Si vous avez une section spécifique pour les commissions
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID de la commission à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commission supprimée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Commission supprimée avec succès !
 *       500:
 *         description: Erreur serveur lors de la suppression de la commission.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la suppression de la commission.
*     security:
 *       - BearerAuth: []
 */


export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()


    const deletedContrats = await prisma.commissions.delete({
        where: {
            id
        }
    })
    if (deletedContrats) {
        return NextResponse.json({ message: "Commission supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la suppression de la Commission !" })
    }

}