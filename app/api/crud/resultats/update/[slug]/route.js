import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"



/**
 * @swagger
 * /api/crud/resultat/update/{slug}:
 *   put:
 *     summary: Mettre à jour un résultat d'étude existant
 *     description: Met à jour un résultat d'étude existant avec les nouvelles données spécifiées.
 *     tags: [Résultats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: L'ID du résultat d'étude à mettre à jour.
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courtage:
 *                 type: string
 *                 description: La nouvelle valeur du champ "courtage" du résultat.
 *               TURPE:
 *                 type: string
 *                 description: La nouvelle valeur du champ "TURPE" du résultat.
 *               CSPE:
 *                 type: string
 *                 description: La nouvelle valeur du champ "CSPE" du résultat.
 *               logiciel:
 *                 type: string
 *                 description: La nouvelle valeur du champ "logiciel" du résultat.
 *               GTB:
 *                 type: string
 *                 description: La nouvelle valeur du champ "GTB" du résultat.
 *              
 *               id_etudes:
 *                 type: integer
 *                 description: L'ID de l'étude à laquelle ce résultat est lié.
 *             example:
 *               courtage: "NouveauCourtage"
 *               TURPE: "NouveauTURPE"
 *               CSPE: "NouveauCSPE"
 *               logiciel: "NouveauLogiciel"
 *               GTB: "NouveauGTB"
 *               
 *               id_etudes: 1
 *     responses:
 *       200:
 *         description: Résultat mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat mis à jour avec succès !
 *       404:
 *         description: Échec lors de la mise à jour du résultat.
 *         content:
 *           application/json:
 *             example:
 *               message: Mise à jour échouée !
*     security:
 *       - BearerAuth: []
 */


export async function PUT(req, { params }) {

    const {
        courtage,
        TURPE,
        CSPE,
        logiciel,
        GTB,
        ctr_nb_compteur_gaz,
        ctr_nb_compteur_elec,
        ctr_fournisseurs_gaz,
        ctr_fournisseurs_elec,
        ctr_ARENH,
        ctr_renegociation,
        ctr_duree_engage_definit,
        ctr_est_accomp_tiers,
        tx_puissance_souscrite,
        tx_formule_tarifaire,
        tx_subis_penalites,
        tx_surfacturation,
        tx_coherence_puissance_1,
        tx_periodique_1_1,
        tx_code_naf_eligible,
        tx_cspe_eligible,
        ec_reduc_consom,
        ec_mesures_econom,
        ec_actions_econom,
        ec_outils_mesure_conso,
        rg_adheresion_tertiaire_1,
        rg_operate_tertiaire_oui_01,
        rg_oblig_obj_tertiaire_oui_01,
        rg_inconnu_tertiaire_non_01,
        rg_bis_1k_tertiaire_non_01,
        rg_bacs_oui_01,
        rg_bacs_outils_oui_01,
        rg_bacs_non_01,
        id_etudes
    } = await req.json()

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    const updatedResultat = await prisma.resultats.update({
        where: {
            id
        },
        data: {
            courtage,
            TURPE,
            CSPE,
            logiciel,
            GTB,
            ctr_nb_compteur_gaz,
            ctr_nb_compteur_elec,
            ctr_fournisseurs_gaz,
            ctr_fournisseurs_elec,
            ctr_ARENH,
            ctr_renegociation,
            ctr_duree_engage_definit,
            ctr_est_accomp_tiers,
            tx_puissance_souscrite,
            tx_formule_tarifaire,
            tx_subis_penalites,
            tx_surfacturation,
            tx_coherence_puissance_1,
            tx_periodique_1_1,
            tx_code_naf_eligible,
            tx_cspe_eligible,
            ec_reduc_consom,
            ec_mesures_econom,
            ec_actions_econom,
            ec_outils_mesure_conso,
            rg_adheresion_tertiaire_1,
            rg_operate_tertiaire_oui_01,
            rg_oblig_obj_tertiaire_oui_01,
            rg_inconnu_tertiaire_non_01,
            rg_bis_1k_tertiaire_non_01,
            rg_bacs_oui_01,
            rg_bacs_outils_oui_01,
            rg_bacs_non_01,
            id_etudes
        }
    })

    if (updatedResultat) {
        return NextResponse.json({
            message: "Resultat mis à jour avec succès !"
        })
    }
    else {
        return NextResponse.json({
            message: "Mise à jours échouée !"
        })
    }




}