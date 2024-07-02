
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
export async function PUT(req) {

    const prisma = new PrismaClient()

    const {
        resultatID,
        CSPE,
        Arhen,
        nbCtrElec,
        nbCtrGaz,
        fournisseurElec,
        fournisseurGaz,
        DateRenego,
        DureeEngagement,
        accTiers,
        puissanceSouscrite,
        formuleAcheminement,
        penalite,
        surfacturConso,
        souscriteSoutirée,
        periodique,
        Naf,
        reducConso,
        mesurReductionConso,
        actionReducConso,
        outilsQuantif,
        assujettiTertiare,
        operate,
        bat1k,
        AssujetiBacs,
        GTB,
        noteAnalyse,
        noteTaxe,
        noteEcoEnergie,
        noteReglementaire,
        noteGlobale,
        obilgation,
        etudeID
    } = await req.json()
    try {
        const createdResult = await prisma.resultats.update({
            where: {
                id: resultatID
            },
            data: {
                noteGlobal: parseInt(noteGlobale),
                noteCategorieAnalyse: parseInt(noteAnalyse),
                noteCategorieEconomiesEnergie: parseInt(noteEcoEnergie),
                noteCategorieReglementaire: parseInt(noteReglementaire),
                noteCategorieTaxes: parseInt(noteTaxe),
                CSPE,
                ctr_nb_compteur_gaz: parseInt(nbCtrGaz),
                ctr_nb_compteur_elec: parseInt(nbCtrElec),
                ctr_fournisseurs_gaz: fournisseurGaz,
                ctr_fournisseurs_elec: fournisseurElec,
                ctr_ARENH: Arhen,
                ctr_renegociation: DateRenego,
                ctr_duree_engage_definit: DureeEngagement,
                ctr_est_accomp_tiers: accTiers,
                tx_puissance_souscrite: puissanceSouscrite,
                tx_formule_tarifaire: formuleAcheminement,
                tx_subis_penalites: penalite,
                tx_surfacturation: surfacturConso,
                tx_coherence_puissance_1: souscriteSoutirée,
                tx_periodique_1_1: periodique,
                tx_cspe_eligible: CSPE,
                ec_reduc_consom: reducConso,
                ec_mesures_econom: mesurReductionConso,
                ec_actions_econom: actionReducConso,
                ec_outils_mesure_conso: outilsQuantif,
                rg_adheresion_tertiaire_1: assujettiTertiare,
                rg_operate_tertiaire_oui_01: operate,
                rg_oblig_obj_tertiaire_oui_01: obilgation,
                rg_bis_1k_tertiaire_non_01: bat1k,
                rg_bacs_oui_01: AssujetiBacs,
                rg_bacs_outils_oui_01: GTB,
                id_etudes: etudeID,
                tx_code_naf_eligible: Naf
            }

        })


        if (createdResult) {
            return NextResponse.json({
                message: 'Resultat Modifié avec succès !'
            }, { status: 201 })

        } else {
            return NextResponse.json({
                message: "Erreur l'or de la Modification du resultat !"
            }, { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Erreur Serveur !"
        }, { status: 500 })
    }


}