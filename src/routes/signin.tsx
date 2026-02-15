import {createFileRoute, Link} from '@tanstack/react-router'
import {useState} from 'react'
import {signIn} from '../lib/auth-client'
import LoginForm from "@/features/auth/LoginForm.tsx";

export const Route = createFileRoute('/signin')({
    component: SignIn,
    validateSearch: (search) => ({
        signup: typeof search.signup === 'string' ? search.signup : undefined,
    }),
})

function SignIn() {

    const [error, setError] = useState('');
    const { signup } = Route.useSearch();

    const handleSignIn = async (email: string, password: string) => {
        const {error} = await signIn.email({
            email,
            password,
            callbackURL: '/',
        })
        if (error) {
            setError(error.message || 'Une erreur est survenue')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                {signup === 'success' && (
                    <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                        Great job signing up! Now you can sign in and start reflecting on what you did today!
                    </div>
                )}
                <LoginForm handleSignIn={handleSignIn} error={error}/>
                <p className="mt-4 text-sm text-center">
                    Pas encore de compte ?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    )
}
