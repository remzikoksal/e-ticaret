
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../store/thunks/clientThunks'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ mode: 'onBlur' })

  const emailRules = {
    required: 'Zorunlu',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: 'Geçersiz email' }
  }

  const onSubmit = async (form) => {
    try {
      await dispatch(loginUser(form.email, form.password, !!form.remember))
      toast.success('Welcome back 👋')
      
      history.push('/')
    } catch (e) {
      toast.error(e.message || 'Login failed')
    
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 flex items-center justify-center">
    
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
         
          <div className="hidden md:block">
            <img
              src="../images/login.jpg" 
              alt="Login"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-semibold text-[#252B42] text-center md:text-left mb-8">
              Welcome Back
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           
              <div>
                <label className="block font-semibold text-[#252B42] mb-2">
                  Email <span className="text-[#E74040]">*</span>
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
                  {...register('password', { required: 'Zorunlu' })}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
              </div>

            
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register('remember')} className="h-4 w-4" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                
              </div>

            
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-md bg-[#23A6F0] text-white font-semibold disabled:opacity-60"
              >
                {isSubmitting && (
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6">
              Test users: customer@commerce.com / store@commerce.com / admin@commerce.com (pwd: 123456)
            </p>

            <p className="text-sm text-gray-700 mt-4">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#23A6F0] underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
