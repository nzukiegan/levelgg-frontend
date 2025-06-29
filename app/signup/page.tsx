"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'player'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/my-wrapper');
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error("Failed to fetch config:", err);
        toast.error("Could not load signup config");
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${config.BACKEND_URL}/api/auth/register/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        is_team_lead: formData.role === 'team_lead',
        is_admin: false
      });
      toast.success('Account created successfully!');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    if (!config) return;
    localStorage.setItem("provider", provider);
    const authUrl = getAuthUrl(provider);
    window.location.href = authUrl;
  };

  const getAuthUrl = (provider: string): string => {
    if (!config) return '';
    const redirectBase = window.location.origin + '/social_callback';
    switch (provider) {
      case 'discord':
        return `https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&redirect_uri=${redirectBase}&response_type=token&scope=identify%20email`;
      case 'facebook':
        return `https://www.facebook.com/v17.0/dialog/oauth?client_id=${config.FACEBOOK_CLIENT_ID}&redirect_uri=${redirectBase}&response_type=token&scope=email`;
      case 'twitch':
        return `https://id.twitch.tv/oauth2/authorize?client_id=${config.TWITCH_CLIENT_ID}&redirect_uri=${redirectBase}&response_type=token&scope=user:read:email`;
      default:
        return '';
    }
  };

  return (
    <main className='font-bahnschrift' style={{ background: 'linear-gradient(to right, #0a1d2f, #0b2840)' }}>
      <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
        <div className="w-[360px] rounded-md px-6 py-8 shadow-2xl text-white border border-[#114369]" style={{ background: 'linear-gradient(to right, #0b2840, #0a1d2f)' }}>
          <div className="text-center mb-6">
            <img src="/login_logo.png" alt="Level Gaming" className="mx-auto w-[180px] h-[66px]" />
          </div>
          <h1 className="text-center text-2xl font-bold mb-4 mt-[41px] tracking-[0.08em]">SIGN UP</h1>
          <p className="text-center text-sm text-white/60 mb-6">Already have an account? <a href="/login" className="text-blue-400 underline">Log in</a></p>

          <div className="space-y-2 mb-4">
            <button onClick={() => handleSocialSignup('discord')} className="w-full py-2 bg-[#5865F2] hover:bg-[#4752c4] rounded-sm text-sm font-semibold">SIGN UP WITH DISCORD</button>
            <button onClick={() => handleSocialSignup('twitch')} className="w-full py-2 bg-[#9146FF] hover:bg-[#7439cc] rounded-sm text-sm font-semibold">SIGN UP WITH TWITCH</button>
            <button onClick={() => handleSocialSignup('facebook')} className="w-full py-2 bg-[#1877F2] hover:bg-[#155cc1] rounded-sm text-sm font-semibold">SIGN UP WITH FACEBOOK</button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-600" />
            <span className="mx-3 text-xs text-gray-400">OR</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          <form onSubmit={handleSubmit}>
            <InputField id="email" label="Email" value={formData.email} handleChange={handleChange} />
            <InputField id="username" label="Username" value={formData.username} handleChange={handleChange} />
            <InputField id="password" label="Password" value={formData.password} handleChange={handleChange} type="password" />
            <InputField id="confirmPassword" label="Confirm Password" value={formData.confirmPassword} handleChange={handleChange} type="password" />

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm mb-1 text-white/80">Account Type</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-[#0a1d2f] focus:border-[#65bdfc] focus:outline-none border border-[#114369] rounded-sm text-sm text-white">
                <option value="player">Player</option>
                <option value="team_lead">Team Leader</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-2 bg-[#1a73e8] hover:bg-[#1664c4] rounded-sm text-sm font-semibold disabled:opacity-50" style={{ background: 'linear-gradient(to right, #65bdfc, #209cf5)' }}>
              {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>
          </form>

          <p className="text-center text-xs text-white/40 mt-4">
            By signing up, you agree to our <a href="#" className="text-blue-400 hover:underline">Terms</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, value, handleChange, type = 'text' }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm mb-1 text-white/80">{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={label}
      className="w-full px-3 py-2 bg-transparent focus:border-[#65bdfc] focus:outline-none border border-[#114369] rounded-sm text-sm placeholder-white/50"
      required
    />
  </div>
);

export default SignupPage;