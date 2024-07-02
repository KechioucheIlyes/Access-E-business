
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

//creation Resultat
/**
 * @swagger
 * /api/crud/resultat/save:
 *   post:
 *     summary: Enregistrer un nouveau résultat d'étude
 *     description: Enregistre un nouveau résultat d'étude avec les données spécifiées.
 *     tags: [Résultats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courtage:
 *                 type: string
 *                 description: La valeur du champ "courtage" du résultat.
 *               TURPE:
 *                 type: string
 *                 description: La valeur du champ "TURPE" du résultat.
 *               CSPE:
 *                 type: string
 *                 description: La valeur du champ "CSPE" du résultat.
 *               logiciel:
 *                 type: string
 *                 description: La valeur du champ "logiciel" du résultat.
 *               GTB:
 *                 type: string
 *                 description: La valeur du champ "GTB" du résultat.
 *               
 *               id_etudes:
 *                 type: integer
 *                 description: L'ID de l'étude à laquelle ce résultat est lié.
 *             example:
 *               courtage: "ExempleCourtage"
 *               TURPE: "ExempleTURPE"
 *               CSPE: "ExempleCSPE"
 *               logiciel: "ExempleLogiciel"
 *               GTB: "ExempleGTB"
 *               
 *               id_etudes: 1
 *     responses:
 *       201:
 *         description: Résultat enregistré avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat enregistré avec succès !
 *       404:
 *         description: Échec lors de l'enregistrement du résultat.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de l'enregistrement du résultat.
*     security:
 *       - BearerAuth: []
 */

export async function POST(req) {

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

    const prisma = new PrismaClient()


    const createResultat = await prisma.resultats.create({
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
    if (createResultat) {
        return NextResponse.json({ message: "Résultat créé avec succès !" }, { status: 201 })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la creation du Résultat" }, { status: 404 })
    }

}