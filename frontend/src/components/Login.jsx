import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

/**
 * Login component — Real Firebase Phone & Google Sign-In
 */
const Login = ({ role, onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [phone, setPhone]     = useState('');
  const [otp, setOtp]         = useState('');
  const [step, setStep]       = useState(1);
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await signInWithGoogle();
      const isAdmin = user.email?.includes('admin') || user.email?.endsWith('@nexusevent.com');
      const assignedRole = isAdmin ? 'admin' : (role || 'student');
      onLogin(assignedRole);
      navigate(assignedRole === 'admin' ? '/admin/events' : '/dashboard');
    } catch (err) {
      setError('Google Login failed. Please try Phone Login.');
      console.error('Google Sign-In error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) return setError('Please enter a valid phone number');
    setError('');
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Try again.');
      if (window.recaptchaVerifier) window.recaptchaVerifier.render().then(w => w.reset());
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError('Please enter OTP');
    setError('');
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      // Admin determination logic based on phone numbers matching a specific admin list, or default to general role
      const adminNumbers = ['+919999999999', '+918888888888']; 
      const isAdmin = adminNumbers.includes(user.phoneNumber);
      const assignedRole = isAdmin ? 'admin' : (role || 'student');
      onLogin(assignedRole);
      navigate(assignedRole === 'admin' ? '/admin/events' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#030712]">
      <div className="bento-card p-10 max-w-[440px] w-full border-2 border-brand-500 dark:border-cyber-primary shadow-xl bg-white dark:bg-[#0a0a0a]">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-brand-50 text-brand-500 dark:bg-transparent dark:text-cyber-primary rounded-2xl dark:rounded-none flex items-center justify-center mx-auto mb-4 border border-brand-100 dark:border-cyber-primary dark:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <span className="text-3xl" aria-hidden="true">☎️</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 dark:font-mono">
            NexusEvent
          </h2>
          <p className="text-slate-500 text-sm dark:text-cyber-secondary">
            Smart Event Management Platform
          </p>
        </div>

        {error && (
          <div role="alert" className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <div id="recaptcha-container"></div>

        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Phone Number</label>
              <input 
                type="tel" 
                placeholder="e.g. 9876543210" 
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-black dark:text-white focus:border-brand-500 dark:focus:border-cyber-primary outline-none transition-all font-mono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-4 px-6 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 dark:bg-cyber-primary dark:hover:bg-cyan-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Get OTP'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Enter OTP</label>
              <input 
                type="text" 
                placeholder="123456" 
                maxLength="6"
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-black dark:text-white focus:border-brand-500 dark:focus:border-cyber-primary outline-none transition-all font-mono text-center tracking-[0.5em] text-lg font-bold"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-4 px-6 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-50 tracking-wider uppercase text-sm"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              onClick={() => { setStep(1); setOtp(''); }}
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white mt-2"
            >
              &larr; Back to Phone Entry
            </button>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] bg-slate-200 dark:bg-white/10 flex-1"></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">OR</span>
            <div className="h-[1px] bg-slate-200 dark:bg-white/10 flex-1"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          aria-label="Sign in with Google account"
          className="w-full flex items-center justify-center gap-3 py-3 px-6 mt-6 border-2 border-slate-200 dark:border-cyber-border rounded-xl transition-all font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-cyber-primary/5 disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google Auth (Fallback)
        </button>
      </div>
    </div>
  );
};

export default Login;
