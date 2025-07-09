'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const AccountTypePage = () => {
  const router = useRouter();
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/my-wrapper')
      .then(res => res.json())
      .then(data => {
        if (!data.BACKEND_URL) throw new Error();
        setBackendUrl(data.BACKEND_URL);
      })
      .catch(() => {
        toast.error("Could not load config");
        router.push('/login');
      });
  }, [router]);

  const handleContinue = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!backendUrl || !accessToken || !accountType) {
      toast.error("Missing required info");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.patch(`${backendUrl}/api/player/account-type/`, {
        is_team_lead: accountType === "team_lead",
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success("Account type saved");

      if (accountType === "team_lead") {
        router.push("/create-team");
      } else {
        router.push("/home");
      }
    } catch {
      toast.error("Failed to set account type");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-[#0b1f39] text-white font-bank">
      <div className="text-center space-y-8 w-full max-w-md px-6">
        <h1 className="text-2xl font-bold">Select Your Account Type</h1>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full p-3 rounded bg-[#0d2645] border border-gray-300"
        >
          <option value="">-- Select an option --</option>
          <option value="team_lead">Team Lead</option>
          <option value="player">Player</option>
        </select>
        <button
          onClick={handleContinue}
          disabled={isSubmitting}
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </button>
      </div>
    </main>
  );
};

export default AccountTypePage;