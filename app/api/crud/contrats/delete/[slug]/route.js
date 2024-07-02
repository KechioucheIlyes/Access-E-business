import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/contrats/delete/{slug}:
 *   delete:
 *     summary: Supprimer un contrat
 *     description: Supprime un contrat en fonction de l'ID spécifié.
 *     tags: [Contrats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du contrat à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contrat supprimé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Contrat supprimé avec succès !
 *       500:
 *         description: Erreur serveur lors de la suppression du contrat.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la suppression du contrat.
*     security:
 *       - BearerAuth: []
 */

export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()


    const deletedContrats = await prisma.contrats.delete({
        where: {
            id
        }
    })
    if (deletedContrats) {
        return NextResponse.json({ message: "Contrat supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la suppression du contrat !" })
    }

}