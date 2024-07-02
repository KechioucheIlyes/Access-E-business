import React from 'react'
import { Audio, Dna, MutatingDots, Oval } from 'react-loader-spinner'

const Loader = ({ color }) => {

    return (
        <div className={'loader'} >

            <Oval
                className={'test'}
                height={20}
                width={20}
                color={color !== '' ? color : "#1a2529"}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
        </div>
    )
}

export default Loader




