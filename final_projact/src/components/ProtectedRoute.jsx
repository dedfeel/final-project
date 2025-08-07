import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    let [isLoading, setIsLoading] = useState(true)
    let [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(token){
            setIsAuthenticated(true)
        }
        setIsLoading(false)

    },[token])

    if(isLoading){
        return <p>Loading...</p>
    }

    return  isAuthenticated ? <Outlet/> : <Navigate to='/kiru' replace/>
}
