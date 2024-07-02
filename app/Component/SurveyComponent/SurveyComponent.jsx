import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "survey-core/i18n/french";
import { themeJson } from "./theme";
import { json } from "./json";
import { Serializer } from "survey-core";
import { useRouter } from 'next/navigation';
import "./style.css"
Serializer.addProperty("itemvalue", {
    name: "score:number"
});
Serializer.addProperty("itemvalue", {
    name: "category:text"
});


async function handleValidate(etude, eligibleCSPE, formedFinalData, score) {

    try {
        const res = await fetch(`/api/score/${etude}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ resultat: formedFinalData, naf: eligibleCSPE, score })

        })

        if (res.ok) {
            const data = await res.json()
            return true;
            router.push(`/protected/user/resultat`)
        }
        else {
            throw new Error('Failed to validate'); // Validation failed
        }
    }
    catch (error) {
        console.error('Validation error:', error);
        return false; // Validation failed
    }
}
function SurveyComponent({ CSPE, naf, etude }) {

    const jsonCopy = JSON.parse(JSON.stringify(json));
    const page = jsonCopy.pages.find(page => page.name === "page14");
    const router = useRouter()
    if (page && page.elements && page.elements.length > 0) {
        const question = page.elements[0];
        if (CSPE) {
            question.visibleIf = "true";
        } else {
            question.visibleIf = "false";
        }

    }



    const survey = new Model(jsonCopy);
    survey.applyTheme(themeJson);
    survey.locale = "fr";
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });

    function calculateTotalScore(data) {
        let totalScore = 0;
        let noteCategorieAnalyse = 0
        let noteCategorieTaxes = 0
        let noteCategorieEconomiesEnergie = 0
        let noteCategorieReglementaire = 0
        let scoreGlobal = 0
        data.forEach((item) => {
            const question = survey.getQuestionByValueName(item.name);
            const qValue = item.value;
            if (question.choices) {
                const selectedChoice = question.choices.find(choice => choice.value === qValue);


                if (selectedChoice && selectedChoice.category === "Analyse contractuelle") {

                    totalScore += selectedChoice.score;
                    noteCategorieAnalyse += selectedChoice.score

                }
                if (selectedChoice && selectedChoice.category === "Optimisation des taxes") {

                    totalScore += selectedChoice.score;
                    noteCategorieTaxes += selectedChoice.score;

                }
                if (selectedChoice && selectedChoice.category === "Économies d'énergie") {
                    totalScore += selectedChoice.score;
                    noteCategorieEconomiesEnergie += selectedChoice.score;

                }
                if (selectedChoice && selectedChoice.category === "Reglementaire") {
                    totalScore += selectedChoice.score;
                    noteCategorieReglementaire += selectedChoice.score;
                }
            }
            if (question.rateValues) {
                const selectedRate = question.rateValues.find(rate => rate.value === qValue);
                if (selectedRate) {
                    totalScore += selectedRate.score;
                }
            }
            if (question.getType() === "matrix") {
                item.data.forEach((dataItem) => {
                    if (!!dataItem.value) {
                        totalScore += dataItem.score;
                    }
                });
            }
        });
        scoreGlobal = ((noteCategorieAnalyse + noteCategorieTaxes + noteCategorieEconomiesEnergie + noteCategorieReglementaire) / 4) * 2


        return {
            totalScore: totalScore,
            scoreMoyen: scoreGlobal,
            noteCategorieAnalyse: noteCategorieAnalyse,
            noteCategorieTaxes: noteCategorieTaxes,
            noteCategorieEconomiesEnergie: noteCategorieEconomiesEnergie,
            noteCategorieReglementaire: noteCategorieReglementaire
        };
    }
    survey.onCompleting.add((sender) => {

        // Get survey results as a flat data array
        const plainData = sender.getPlainData({
            // Include `score` values into the data array
            calculations: [{ propertyName: "score" }]
        });
        const scores = calculateTotalScore(plainData);



        // Save the scores in survey results

        const score = {
            totalScore: scores.totalScore,
            noteCategorieAnalyse: scores.noteCategorieAnalyse,
            noteCategorieTaxes: scores.noteCategorieTaxes,
            noteCategorieEconomiesEnergie: scores.noteCategorieEconomiesEnergie,
            noteCategorieReglementaire: scores.noteCategorieReglementaire,
            scoreMoyen: scores.scoreMoyen,
        }

        const validationSuccess = handleValidate(etude, CSPE, sender.data, score)

        if (validationSuccess) {
            router.push(`/protected/user/resultat`);
        } else {
            console.log("ERREUR")
        }

        sender.setValue("totalScore", scores.totalScore);
        sender.setValue("noteCategorieAnalyse", scores.noteCategorieAnalyse);
        sender.setValue("noteCategorieTaxes", scores.noteCategorieTaxes);
        sender.setValue("noteCategorieEconomiesEnergie", scores.noteCategorieEconomiesEnergie);
        sender.setValue("noteCategorieReglementaire", scores.noteCategorieReglementaire);

    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;