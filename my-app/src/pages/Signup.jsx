import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { api } from "../lib/axios";
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchRolesIfNeeded } from '../store/thunks/clientThunks'

export default function Signup() {
  const history = useHistory()
  const dispatch = useDispatch()
  const roles = useSelector((s) => s.client.roles) || []

  const normalize = (s = '') =>
    String(s)
      .toLowerCase()
      .replaceAll('ş', 's')
      .replaceAll('ı', 'i')
      .replaceAll('ğ', 'g')
      .replaceAll('ç', 'c')
      .replaceAll('ö', 'o')
      .replaceAll('ü', 'u')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

 
  useEffect(() => {
    dispatch(fetchRolesIfNeeded())
  }, [dispatch])

 
  useEffect(() => {
    if (!roles?.length) return
    const current = watch('role_id')
    if (current) return

    const customer =
      roles.find((r) => {
        const nm = normalize(r?.name ?? r?.role)
        return nm.includes('musteri') || nm.includes('customer')
      }) || roles[0]

    if (customer?.id != null) setValue('role_id', String(customer.id))
  }, [roles])

  const selectedRoleId = watch('role_id')
  const selectedRole = useMemo(
    () => roles.find((r) => String(r.id) === String(selectedRoleId)),
    [roles, selectedRoleId]
  )

 
  const isStore = (() => {
    const nm = normalize(selectedRole?.name ?? selectedRole?.role ?? '')
    return nm.includes('store') || nm.includes('magaza')
  })()

  
  function normalizePhone(v) {
    if (!v) return v
    const d = v.replace(/\D/g, '')
    if (d.startsWith('90') && d.length === 12) return `+${d}`
    if (d.startsWith('0') && d.length === 11) return `+90${d.slice(1)}`
    if (d.length === 10) return `+90${d}`
    return v
  }
  function normalizeIban(v) {
    return (v || '').replace(/\s+/g, '').toUpperCase()
  }

  
  const nameRules = { required: 'Zorunlu', minLength: { value: 3, message: 'En az 3 karakter' } }
  const emailRules = {
    required: 'Zorunlu',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: 'Geçersiz email' },
  }
  const passwordRules = {
    required: 'Zorunlu',
    validate: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(v) ||
      '8+ karakter, sayı, küçük/büyük harf ve özel karakter içermeli',
  }
  const confirmRules = {
    required: 'Zorunlu',
    validate: (v) => v === watch('password') || 'Şifreler eşleşmiyor',
  }
  const phoneRules = {
    required: 'Zorunlu',
    validate: (v) => {
      const d = (v || '').replace(/\D/g, '')
      return (
        (d.startsWith('90') && d.length === 12) ||
        (d.startsWith('0') && d.length === 11) ||
        d.length === 10
      ) || 'Geçerli bir Türkiye cep telefonu girin'
    },
  }
  const taxRules = {
    required: 'Zorunlu',
    validate: (v) => /^T\d{4}V\d{6}$/.test(String(v || '').toUpperCase()) || 'Biçim: TXXXXVXXXXXX',
  }
  const ibanRules = {
    required: 'Zorunlu',
    validate: (v) => /^TR\d{24}$/.test(normalizeIban(v)) || 'TR ile başlayan 26 haneli IBAN girin',
  }

  const onSubmit = async (form) => {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role_id: Number(form.role_id),
    }

    if (isStore) {
      payload.store = {
        name: form.store?.name,
        phone: normalizePhone(form.store?.phone),
        tax_no: (form.store?.tax_no || '').toUpperCase(),
        bank_account: normalizeIban(form.store?.bank_account),
      }
    }

    try {
      await api.post('/signup', payload)
      toast.warn('You need to click link in email to activate your account!')
      history.length > 1 ? history.goBack() : history.push('/')
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Kayıt başarısız'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block">
            <img
              src="../images/signup.jpg"
              alt="Signup"
              className="h-full w-full object-cover"
            />
          </div>

         
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-semibold text-[#252B42] text-center md:text-left mb-8">
              Create Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Name <span className="text-[#E74040]">*</span>
                </label>
                <input
                  className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Full Name *"
                  {...register('name', nameRules)}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>

            
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Email address <span className="text-[#E74040]">*</span>
                </label>
                <input
                  type="email"
                  className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="example@gmail.com"
                  {...register('email', emailRules)}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>

             
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Password <span className="text-[#E74040]">*</span>
                </label>
                <input
                  type="password"
                  className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="********"
                  {...register('password', passwordRules)}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

           
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Confirm Password <span className="text-[#E74040]">*</span>
                </label>
                <input
                  type="password"
                  className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="********"
                  {...register('password_confirm', confirmRules)}
                />
                {errors.password_confirm && (
                  <p className="text-red-600 text-sm mt-1">{errors.password_confirm.message}</p>
                )}
              </div>

              
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Role <span className="text-[#E74040]">*</span>
                </label>
                <select
                  className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register('role_id', { required: true })}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name || r.role}
                    </option>
                  ))}
                </select>
                {errors.role_id && (
                  <p className="text-red-600 text-sm mt-1">Rol seçin</p>
                )}
              </div>

             
              {isStore && (
                <div className="space-y-5 pt-4">
                  <h2 className="font-semibold text-[#252B42]">Store Information</h2>

               
                  <div>
                    <label className="block font-semibold text-[#252B42] mb-2">
                      Store Name <span className="text-[#E74040]">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Store Name *"
                      {...register('store.name', {
                        required: 'Zorunlu',
                        minLength: { value: 3, message: 'En az 3 karakter' },
                      })}
                    />
                    {errors.store?.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.store.name.message}</p>
                    )}
                  </div>

                 
                  <div>
                    <label className="block font-semibold text-[#252B42] mb-2">
                      Store Phone <span className="text-[#E74040]">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="+90 5xx xxx xx xx"
                      {...register('store.phone', phoneRules)}
                    />
                    {errors.store?.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.store.phone.message}</p>
                    )}
                  </div>

                 
                  <div>
                    <label className="block font-semibold text-[#252B42] mb-2">
                      Store Tax ID (TXXXXVXXXXXX) <span className="text-[#E74040]">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="T1234V123456"
                      {...register('store.tax_no', { ...taxRules })}
                    />
                    {errors.store?.tax_no && (
                      <p className="text-red-600 text-sm mt-1">{errors.store.tax_no.message}</p>
                    )}
                  </div>

                
                  <div>
                    <label className="block font-semibold text-[#252B42] mb-2">
                      Store Bank IBAN (TR...) <span className="text-[#E74040]">*</span>
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="TR________________________"
                      {...register('store.bank_account', { ...ibanRules })}
                    />
                    {errors.store?.bank_account && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.store.bank_account.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-md bg-[#23A6F0] text-white font-semibold disabled:opacity-60"
              >
                {isSubmitting && (
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
