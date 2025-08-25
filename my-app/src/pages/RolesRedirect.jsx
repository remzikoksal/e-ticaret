import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function RolesRedirect() {
  const history = useHistory()
  useEffect(() => {
    toast.info('Hesabınız aktifleştirildi. Lütfen giriş yapın.')
    history.replace('/login') 
  }, [history])
  return null
}
