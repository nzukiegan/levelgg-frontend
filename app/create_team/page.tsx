'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const TeamCreatePage = () => {
  const router = useRouter();
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamCode, setTeamCode] = useState<string | null>(null);

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

  const handleTeamCreate = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!backendUrl || !accessToken || !teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${backendUrl}/api/teams/`, {
        name: teamName,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const team = res.data;
      setTeamCode(team.code);
      toast.success("Team created!");
      router.push("/home");
    } catch {
      toast.error("Failed to create team");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-[#0b1f39] text-white font-bank">
      <div className="text-center space-y-6 w-full max-w-md px-6">
        <h1 className="text-2xl font-bold">Create Your Team</h1>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team name"
          className="w-full p-3 rounded bg-[#0d2645] border border-gray-300"
        />
        <button
          onClick={handleTeamCreate}
          disabled={isSubmitting}
          className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Team'}
        </button>
        {teamCode && (
          <div className="bg-gray-800 p-4 rounded mt-4">
            <p className="font-semibold">Share this code with your team:</p>
            <code className="block mt-2 text-lg text-blue-400">{teamCode}</code>
          </div>
        )}
      </div>
    </main>
  );
};

export default TeamCreatePage;