'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/shared/Header';
import { Header2 } from '@/components/shared/Header2';

const roleIcons: Record<string, string> = {
  INFANTRY: "/infantry2.png",
  ARMOR: "/armour2.png",
  HELI: "/heli.png",
  JET: "/jet.png"
};

type Player = {
  player_name: string;
  icon: string;
  rank: string;
  country: string;
  country_icon: string;
  points: number;
  kd: number;
  winrate: number;
};

type Squad = {
  squad_type: string;
  members: Player[];
};

type GroupedData = Record<string, Record<string, Squad[]>>;

export default function BattlefieldHome() {
  const [collapsedRoles, setCollapsedRoles] = useState<Record<string, boolean>>({});
  const [groupedData, setGroupedData] = useState<GroupedData>({});
  const [tournamentInfo, setTournamentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const toggleCollapse = (role: string) => {
    setCollapsedRoles(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configRes = await fetch('/api/my-wrapper/');
        const config = await configRes.json();
        const backendUrl = config.BACKEND_URL;

        const { data } = await axios.get(`${backendUrl}/api/upcoming_tournament/`);
        console.log(JSON.stringify(data))
        setTournamentInfo(data);

        const grouped: GroupedData = {};

        data.teams.forEach((team: any) => {
          const teamName = team.team_name;
          if (!grouped[teamName]) grouped[teamName] = {};

          team.squads.forEach((squad: any) => {
            const actionGroups: Record<string, Player[]> = {};

            squad.members.forEach((member: any) => {
              const role = member.action_role;
              if (!actionGroups[role]) actionGroups[role] = [];
              actionGroups[role].push(member);
            });

            Object.entries(actionGroups).forEach(([role, members]) => {
              if (!grouped[teamName][role]) grouped[teamName][role] = [];
              grouped[teamName][role].push({ squad_type: squad.squad_type, members });
            });
          });
        });

        setGroupedData(grouped);
      } catch (err) {
        console.error("Error loading tournament data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTeamSection = (teamName: string, roles: Record<string, Squad[]>) => (
    <div key={teamName}>
      <h2 className="text-[38px] font-bank font-bold mt-[80px] tracking-[0.08em]">{teamName.toUpperCase()} TEAM</h2>
      <div className="pr-[158px] mt-4 pb-16">
        {Object.entries(roles).map(([role, squads]) => (
          <div key={role} className="relative border-[1px] mb-4 border-blue-400 p-8 rounded bg-gradient-to-r from-[#09233c] to-[#0a1d2e] scrollbar-transparent">
            {!collapsedRoles[role] && roleIcons[role] && (
              <img src={roleIcons[role]} alt={role} className="absolute w-48 top-6 right-4 z-10 rounded" />
            )}
            <div className="flex items-center mb-6 cursor-pointer z-20 relative" onClick={() => toggleCollapse(role)}>
              <img
                src="/arrowDown.png"
                alt="Toggle"
                className={`w-9 h-10 border border-[#1e8ede] py-3 px-2 rounded transition-transform duration-300 ${collapsedRoles[role] ? 'rotate-180' : ''}`}
              />
              <h2 className="ml-3 text-[24px] font-bank tracking-[0.08em]">{role}</h2>
            </div>
            {!collapsedRoles[role] && (
              <div className="max-h-[400px] overflow-y-auto pr-4 z-20 relative">
                {squads.map((squad, idx) => (
                  <div key={idx} className="mb-8 z-20 relative">
                    <h3 className="font-bank mb-4 text-[18px] tracking-[0.08em]">{squad.squad_type} SQUAD</h3>
                    <div className="flex text-xs font-bold text-[#FFFFFF] ml-[40px] mt-2 font-bahnschrift">
                      <div className="w-[180px]">PLAYER</div>
                      <div className="w-[180px]">RANK</div>
                      <div className="w-[180px]">COUNTRY</div>
                      <div className="w-[180px]">POINTS</div>
                      <div className="w-[180px]">K/D</div>
                      <div className="w-[180px]">WIN RATE</div>
                    </div>
                    {squad.members.map((player, idx) => (
                      <div
                        key={player.player_name + idx}
                        className={`flex items-center p-2 mt-2 text-sm text-white rounded-md font-bahnschrift ${
                          idx % 2 === 0
                            ? 'bg-gradient-to-r from-[#0e3b61] to-transparent'
                            : 'bg-gradient-to-r from-[#0a2e4d] to-transparent'
                        }`}
                      >
                        <div className="w-[210px] flex items-center space-x-2">
                          <img src={'/bfMiniImg.jpg'} alt="icon" className="w-6 h-6 rounded-full" />
                          <span>{player.player_name}</span>
                        </div>
                        <div className="w-[180px]">{player.rank}</div>
                        <div className="w-[180px] flex items-center space-x-2">
                          <img src={player.country_icon} alt="flag" className="w-6 h-6 rounded-full" />
                          <span>{player.country}</span>
                        </div>
                        <div className="w-[180px]">{player.points}</div>
                        <div className="w-[180px]">{player.kd}</div>
                        <div className="w-[180px] flex items-center space-x-2">
                          <WinRateCircle winrate={player.winrate} />
                          <span className="text-xs font-bold">{player.winrate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="hero-gradient min-h-screen text-white relative overflow-hidden bg-[#08182a] font-bahnschrift">
      <img
        src="/player.png"
        alt="Players"
        className="fixed top-40 right-[-40px] w-[600px] h-[auto] z-0 pointer-events-none"
      />
      <Header />
      <Header2 />
      <div className="relative z-20 flex">
        <div className="flex-1 bg-gradient-to-r from-[#061526] to-[#0b1f30]/70 pl-[158px]">
          <section className="pt-[48px] min-h-screen bg-gradient-to-r from-[#08182a] to-[#0a3152]/10">
            {!loading && tournamentInfo && (
              <div className="flex p-[2px] bg-gradient-to-r from-[#377cca] to-[#0d2a42]/10 rounded-md mb-8">
                <div className="flex p-2 bg-gradient-to-r from-[#0e3250] via-[#0f2f49] to-[#0a3152]/10 rounded h-full w-full">
                  <img
                    src="/bfVImg.jpg"
                    alt="Battlefield"
                    className="h-[192px] w-[131px] object-cover rounded-md"
                  />
                  <div className="ml-[24px] mt-auto mb-auto">
                    <div className="flex">
                      <div className="flex border-2 border-[#1e8ede] p-[8px] rounded mr-6 bg-gradient-to-r from-[#125181] to-[#0d3658]">
                        <h2 className="px-2 font-bold">{tournamentInfo.registered_players}/{tournamentInfo.max_players}</h2>
                        <span className="text-sm self-center">Players</span>
                      </div>
                      <p className="self-center font-bank text-[16px] tracking-[0.08em]">BATTLEFIELD 2042</p>
                    </div>
                    <h2 className="text-[38px] font-bank font-bold mt-4 mb-4 tracking-[0.08em]">{tournamentInfo.title}</h2>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <Info label="Mode" value={tournamentInfo.mode} />
                      <Info label="Date" value={new Date(tournamentInfo.start_date).toLocaleString()} />
                      <Info label="Region" value={tournamentInfo.region} />
                      <Info label="Level" value={tournamentInfo.level} />
                      <Info label="Platform" value={tournamentInfo.platform} />
                      <Info label="Language" value={tournamentInfo.language} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {loading ? (
              <div className="text-center mt-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mr-auto ml-auto mt-16"></div>
              </div>
            ) : (
              Object.entries(groupedData).map(([teamName, roles]) => renderTeamSection(teamName, roles))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-white/60 text-[12px]">{label}</p>
      <p className="font-semibold text-[16px] text-[#209CF5]">{value}</p>
    </div>
  );
}

function WinRateCircle({ winrate }: { winrate: number }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * winrate) / 100;

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="transform -rotate-90">
      <circle cx="16" cy="16" r={radius} stroke="#11456e" strokeWidth="2" fill="none" />
      <circle cx="16" cy="16" r={radius} stroke="#209CF5" strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={offset} fill="none" />
    </svg>
  );
}