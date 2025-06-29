'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const SocialCallbackPage = () => {
  const router = useRouter();
  const hasRun = useRef(false);
  const [backendUrl, setBackendUrl] = useState<string | null>(null);

  // Fetch backend config
  useEffect(() => {
    const fetchBackendUrl = async () => {
      try {
        const res = await fetch('/api/my-wrapper');
        const data = await res.json();
        if (!data.BACKEND_URL) throw new Error("Missing BACKEND_URL in config");
        setBackendUrl(data.BACKEND_URL);
      } catch (error) {
        console.error("Failed to fetch backend config:", error);
        toast.error("Could not load signup config");
      }
    };

    fetchBackendUrl();
  }, []);

  // Perform signup after config is loaded
  useEffect(() => {
    if (!backendUrl || hasRun.current) return;

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const provider = "discord";

    if (!access_token) {
      toast.error("Missing access token");
      router.push("/login");
      return;
    }

    hasRun.current = true;

    axios.post(`${backendUrl}/api/auth/social/signup/`, {
      provider,
      access_token,
    })
    .then((response) => {
      const { tokens, user } = response.data;

      sessionStorage.setItem("access_token", tokens.access);
      sessionStorage.setItem("refresh_token", tokens.refresh);
      sessionStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Signup successful! Redirecting...");
      router.push("/home");
    })
    .catch((err) => {
      const detail = err?.response?.data?.detail;
      const message = Array.isArray(detail) ? detail[0] : detail;

      console.error("Signup error:", message || err);

      if (typeof message === "string" && message.includes("already exists")) {
        toast.info("Account exists. Redirecting to login...");
        router.push("/login");
      } else if (err?.response?.status === 400) {
        router.push("/login");
      } else {
        router.push("/signup");
      }
    });
  }, [backendUrl, router]);

  return (
    <main className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-[#041529] to-[#0b1f39]">
      <div>
        <img src="/footer_logo.png" className="w-[200px]" alt="Footer Logo" />
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto mt-16" />
      </div>
    </main>
  );
};

export default SocialCallbackPage;