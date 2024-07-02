/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        PAPPERS_API: 'f0fe796ca41d0e72feb0a68bb19e9755cecccf9ef59df784',
    },
    compiler: {
        removeConsole: {
            exclude: ['error']
        }
    },

    reactStrictMode: false,

}



