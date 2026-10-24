import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFillGuestCredentials = (guestType) => {
        if (guestType === 1) {
            setFormData({
                email: 'guest1@gmail.com',
                password: '12345678',
            });
            setIsFilled('guest1');
        } else {
            setFormData({
                email: 'guest2@gmail.com',
                password: '12345678',
            });
            setIsFilled('guest2');
        }
        setError('');
        setTimeout(() => setIsFilled(null), 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address (e.g., user@example.com)');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ id: data._id, name: data.name }));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Server error. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link to="/" className="text-3xl font-extrabold text-indigo-900 tracking-tight">SkillSwap</Link>
                    <h2 className="mt-4 text-2xl font-bold text-slate-800">Welcome back</h2>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50">
                    {/* Recruiter / Demo Fast-Login Section */}
                    <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50/90 via-purple-50/60 to-white border border-indigo-100/90 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">Recruiter / Guest Access</span>
                            </div>
                            <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Click to autofill</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            {/* Guest 1 Button */}
                            <button
                                type="button"
                                onClick={() => handleFillGuestCredentials(1)}
                                className={`p-3 text-left rounded-xl border transition-all duration-200 active:scale-95 group relative ${
                                    isFilled === 'guest1'
                                        ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 shadow-sm'
                                        : 'bg-white hover:bg-indigo-50/70 border-slate-200 hover:border-indigo-300 shadow-xs'
                                }`}
                                title="Autofill Guest 1 credentials"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                                        <span>👤</span> Guest 1
                                    </span>
                                    {isFilled === 'guest1' ? (
                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Filled!
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                            Autofill
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-600 font-mono font-medium truncate">guest1@gmail.com</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">pass: 12345678</p>
                            </button>

                            {/* Guest 2 Button */}
                            <button
                                type="button"
                                onClick={() => handleFillGuestCredentials(2)}
                                className={`p-3 text-left rounded-xl border transition-all duration-200 active:scale-95 group relative ${
                                    isFilled === 'guest2'
                                        ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 shadow-sm'
                                        : 'bg-white hover:bg-purple-50/70 border-slate-200 hover:border-purple-300 shadow-xs'
                                }`}
                                title="Autofill Guest 2 credentials"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                                        <span>👤</span> Guest 2
                                    </span>
                                    {isFilled === 'guest2' ? (
                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Filled!
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                            Autofill
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-600 font-mono font-medium truncate">guest2@gmail.com</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">pass: 12345678</p>
                            </button>
                        </div>

                        <p className="mt-2.5 text-[11px] text-slate-500 text-center">
                            💡 Use <strong className="text-slate-700">Guest 1</strong> to post & <strong className="text-slate-700">Guest 2</strong> to express interest!
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-white/50 backdrop-blur-sm"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-white/50 backdrop-blur-sm pr-12"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-80 cursor-not-allowed hover:-translate-y-0' : 'hover:-translate-y-0.5'}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <span>Signing in</span>
                                    <span className="ml-1.5 flex items-center space-x-1 pb-1">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </span>
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
