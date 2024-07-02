import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



/**
 * @swagger
 * /api/crud/contrats/save:
 *   post:
 *     summary: Enregistrer un nouveau contrat
 *     description: Enregistrer un nouveau contrat avec les informations fournies.
 *     tags: [Contrats]
 *     requestBody:
 *       description: Données du contrat à Enregistrer
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
 *         description: Contrat Enregistré avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Contrat Enregistré avec succès !
 *       500:
 *         description: Erreur serveur lors de l'enregistrement du contrat.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de l'enregistrement du contrat.
*     security:
 *       - BearerAuth: []
 */

export async function POST(req, { params }) {

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

    const createContrat = await prisma.contrats.create({
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
    if (createContrat) {
        return NextResponse.json({
            message: "Contrat creer avec succès !"
        },
            {
                status: 200
            })
    }
    else {
        return NextResponse.json({
            message: "Echec l'ors de la creation du contrat !"
        })
    }



}