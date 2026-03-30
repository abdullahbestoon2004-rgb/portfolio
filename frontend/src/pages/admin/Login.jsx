import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate('/admin/dashboard');
        }
    }, [admin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const { success, error: authError } = await login(email, password);
        setIsLoading(false);
        if (!success) {
            setError(authError);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-dark)] flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-md glass p-10 rounded-3xl border border-white/10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                        <Lock className="text-[var(--color-accent)]" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter">Admin Portal</h1>
                    <p className="text-white/50 text-sm mt-2">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {error && (
                        <div className="bg-red-500/10 text-red-500 text-sm font-medium py-3 px-4 rounded-xl border border-red-500/20 text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>

                    <a href="/" className="text-center text-sm text-white/40 hover:text-white mt-4 transition-colors">
                        &larr; Back to Portfolio
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
