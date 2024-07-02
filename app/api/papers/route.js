

import { NextResponse } from "next/server"
export async function POST(req) {


    const { nomEntreprise } = await req.json()
    try {
        if (nomEntreprise != '') {
            const res = await fetch(`https://suggestions.pappers.fr/v2?api_token=97a405f1664a83329a7d89ebf51dc227b90633c4ba4a2575&q=${nomEntreprise}&cibles=nom_entreprise,representant`)
            if (res.ok) {
                const data = await res.json()
                return NextResponse.json({ data: data }, { status: 200 })
            } else {
                return NextResponse.json({ message: "une erreur s'est produite veuillez reessayer plus tard !" }, { status: 400 })
            }
        }

    } catch (error) {
        return NextResponse.json({ message: "une erreur s'est produite veuillez reessayer plus tard !" }, { status: 500 })
    }

}