import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth";
// recuperer tout les resultat

/**
 * @swagger
 * /api/crud/commissions:
 *   get:
 *     summary: Récupérer toutes les commissions
 *     description: Récupère toutes les commissions disponibles.
 *     tags: [Commission]  # Si vous avez une section spécifique pour les commissions
 *     responses:
 *       200:
 *         description: Toutes les commissions récupérées avec succès.
 *         content:
 *           application/json:
 *             example:
 *               allCommissions: [commission1, commission2, ...]
 *       500:
 *         description: Erreur serveur lors de la récupération de toutes les commissions.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération de toutes les commissions.
*     security:
 *       - BearerAuth: []
 */


export async function GET(req) {

    const session = await getServerSession(authOptions)

    const userId = parseInt(session?.user?.id)


    const prisma = new PrismaClient()



    const user = await prisma.user.findUnique({
        where: {
            id: userId,

        },
        include: {
            Clients: {
                where: {
                    Etudes: {
                        some: {
                            statut: "terminé"
                        }
                    }
                },
                include: {
                    Etudes: {
                        where: {
                            statut: "terminé"
                        },
                        include: {
                            resultats: true,
                            Commissions: {
                                where: {
                                    Etudes: {
                                        some: {
                                            statut: "terminé"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    Dirigeants: true
                }
            },
            Commissions: {
                where: {
                    Etudes: {
                        some: {
                            statut: "terminé"
                        }
                    }
                }
            },
        }
    });


    if (user) {
        return NextResponse.json({ user })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les contrats" })
    }

}
