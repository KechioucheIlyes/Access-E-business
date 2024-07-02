import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(req) {

    const { idEtude, idClient } = await req.json()
    console.log(idEtude)
    console.log(idClient)
    const prisma = new PrismaClient()
    try {

        const client = await prisma.clients.findUnique({
            where: {
                id: parseInt(idClient)
            },

            include: {
                Dirigeants: true
            }
        })

        if (client) {
            console.log("client", client)


            const etude = await prisma.etudes.findUnique({
                where: {
                    id: parseInt(idEtude)
                },
                include: {
                    contrats: true,
                    resultats: true
                }
            });


            if (etude) {

                if (etude.contrats.length > 0) {
                    const deletedContrat = await prisma.contrats.delete({
                        where: {
                            id: parseInt(etude.contrats[0].id)
                        },
                    });
                }

                if (etude.resultats.length > 0) {
                    const deletedResultat = await prisma.resultats.delete({
                        where: {
                            id: etude.resultats[0].id
                        }
                    })


                }


            }

            if (client.Dirigeants.length > 0) {
                const deletedDirigeant = await prisma.dirigeants.delete({
                    where: {
                        id: parseInt(client.Dirigeants[0].id)
                    }
                })
            }

            // if (etude && etude.ID_clients) {


            //     console.log("JE RENTRE LA")
            //     await prisma.clients.delete({
            //         where: {
            //             id: parseInt(idEtude)
            //         },
            //     });



            // }

            const deletedEtude = await prisma.etudes.delete({
                where: {
                    id: parseInt(idEtude)
                }
            })

            if (deletedEtude) {
                return NextResponse.json({
                    message: "Etude supprimé avec success ! "
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    message: "Erreur l'or de la suppression de l'étude !  "
                }, { status: 400 })
            }




        } else {
            return NextResponse.json({
                message: "Erreur l'or de la suppression du client !  "
            }, { status: 400 })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Erreur l'or de la suppression de l'étude !  "
        }, { status: 500 })
    }


}