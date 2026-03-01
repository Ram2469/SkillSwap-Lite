import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">

            {/* Decorative background blurs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 text-center max-w-3xl flex flex-col items-center">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-md">
                    Welcome to the future of learning
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    SkillSwap Lite
                </h1>
                <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl font-light">
                    Exchange Skills. Grow Together. Connect with like-minded individuals to trade knowledge and level up your career.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link
                        to="/register"
                        className="px-8 py-4 rounded-full bg-white text-indigo-900 font-bold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.7)] hover:-translate-y-1"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                    >
                        Login to Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
