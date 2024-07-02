import React from 'react'

const AdminPic = ({ defaultPic = true , src }) => {
    return (
        defaultPic ? <img src={src}></img> : null
    )
}

export default AdminPic