import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./utilities/AuthProvider.jsx";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // last location (if timeout logout) or default dashboard
    const redirectTo = location.state?.from?.pathname || "/talent-spotting/talent-dashboard";

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await login({ usernameOrEmail, password });
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="bg-background-light min-h-screen flex flex-col font-display antialiased text-gray-900 overflow-x-hidden transition-colors duration-200">
            <header className="w-full flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 lg:px-10 z-10 relative">
                <div className="flex items-center gap-3">
                    <img
                        src="https://assets.pidilite.com/is/image/pidilite/pidilite-logo-1?ts=1717678989820&dpr=off"
                        alt="Pidilite Logo"
                        className="h-8"
                    />
                    <h1 className="text-lg font-bold tracking-tight text-gray-900">
                        Pidilite AI-Ready Talent Management System
                    </h1>
                </div>
            </header>

            {/* Decorative background remains the same */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-t from-gray-100 to-transparent opacity-50"></div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row h-full items-center justify-center p-4 lg:p-10 z-10 relative gap-10 lg:gap-20">
                <div className="hidden lg:flex flex-col flex-1 max-w-lg space-y-6">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        <img className="w-full h-full bg-cover bg-center" alt="Abstract digital network visualization in blue tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8s_jTRnevrUoB_FcuNG_LbXNspr5ItCTjT6r-_BJRzkcGPkerGHnaGrWTkt0iZReBwS3sFEG5VO7a45HuI_3_tod53xNdM2zxh9cNrNmOpsVWmKQCURpx5Pc4CvpdeHqHw1n-SnlzC8QQ-lUxSTwa_AlSwTGNxTtYo5D_5UqlZ9uqEQrsblqfG8xM1zyDzdo_5fsHI1hNei3UyRdouYTXc2AMi8BPy6NPyujSbl53kWehRHuBSK5giw_UaZzWyId4x0xrF_nO5M"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent">
                            <div className="absolute bottom-6 left-6 right-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Empowering Talent with AI</h2>
                                <p className="text-gray-100">Seamlessly manage, develop, and retain top talent with our intelligent, data-driven platform.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-[480px]">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10 flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
                            <p className="text-gray-500">Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-2">
                                {error}
                            </div>
                        )}

                        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700" htmlFor="username">
                                    Username or Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </div>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-10 pr-4 placeholder:text-gray-400 transition-all shadow-sm"
                                        id="username"
                                        placeholder="Enter your username or email"
                                        type="text"
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <div className="relative flex items-center">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-10 pr-12 placeholder:text-gray-400 transition-all shadow-sm"
                                        id="password"
                                        placeholder="Enter your password"
                                        type={showPwd ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        type="button"
                                        onClick={() => setShowPwd((s) => !s)}
                                        aria-label={showPwd ? "Hide password" : "Show password"}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPwd ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary hover:bg-sky-500 text-white font-semibold rounded-lg h-12 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                                type="submit"
                                disabled={submitting}
                            >
                                <span>{submitting ? "Signing In…" : "Sign In"}</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </form>

                        {/* Separator + SSO button remain unchanged */}
                        <div className="relative flex items-center py-1">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <button
                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg h-12 transition-colors shadow-sm flex items-center justify-center gap-3"
                            type="button"
                            onClick={() => alert("Hook this to your Pidilite SSO / Entra ID flow")}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <path d="M11.5 12.5H6.5V22H11.5V12.5Z" fill="#F25022"></path>
                                <path d="M11.5 2H6.5V11.5H11.5V2Z" fill="#7FBA00"></path>
                                <path d="M22 2H17V11.5H22V2Z" fill="#FFB900"></path>
                                <path d="M22 12.5H17V22H22V12.5Z" fill="#00A4EF"></path>
                            </svg>
                            Login with Pidilite Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
