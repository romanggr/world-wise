import React, { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { isAuthentificated } = useAuth()
    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/")
        }
    }, [isAuthentificated, navigate])

    return children

}

export default ProtectedRoute