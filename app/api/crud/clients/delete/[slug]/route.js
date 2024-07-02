import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/clients/delete:
 *   delete:
 *     summary: Supprimer un client
 *     description: Supprime un client et toutes ses données associées en fonction de l'ID spécifié.
 *     tags: [Clients]  # Si vous avez une section spécifique pour les clients
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du client à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client supprimé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Client supprimé avec succès !
 *       500:
 *         description: Erreur serveur lors de la suppression du client.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la suppression du client.
*     security:
 *       - BearerAuth: []
 */



export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)
    const prisma = new PrismaClient()

    const client = await prisma.clients.findFirst({
        where: {
            id
        }
    })


    const deletedDerigent = await prisma.dirigeants.delete({
        where: {
            client_id: client.id
        }
    })

    await prisma.etudes.delete({
        where: {
            client_id: client.id
        }
    })

    const deletedClient = await prisma.clients.delete({
        where: {
            id: client.id
        },
        include: {
            Etudes: true,
            Dirigeants: true
        }
    })



    if (deletedClient) {
        return NextResponse.json({ message: "Client supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la suppression du Client !" })
    }

}