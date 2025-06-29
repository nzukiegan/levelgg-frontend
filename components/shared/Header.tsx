'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Games', href: '/battlefield' },
    { label: 'About', href: '/about' },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username);
      } catch (err) {
        console.error("Invalid user data in localStorage:", err);
      }
    }
  }, []);

  return (
    <header className="flex justify-between items-center h-[62px] bg-[#182d3e] pl-[24px] pr-[24px]">
      <div className="flex items-center">
        <div onClick={() => router.push('/')} className="cursor-pointer">
          <img
            src="/footer_logo.png"
            alt="Logo"
            className="w-[90px] h-[33px] mt-[14px] mb-[14px]"
          />
        </div>

        <div className="flex ml-[69px] text-white text-[16px] h-full gap-[2px]">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <div
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`cursor-pointer flex items-center h-[60px] px-4 ${
                  isActive ? 'border-b-2 border-white font-bold' : ''
                } hover:border-b-2 hover:border-white transition`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative w-[275px] h-[37px] border border-white/30 rounded-sm flex items-center px-3 py-2 bg-transparent">
        <img src="/searchGlass.svg" alt="search icon" className="h-4 w-4" />
        <input
          id="search"
          type="text"
          placeholder="Search tournaments"
          className="w-full pl-3 bg-transparent border-none focus:outline-none text-sm placeholder-white/50"
        />
      </div>

      <div className="flex items-center">
        <img
          src="/events1.png"
          alt="Events"
          className="w-9 h-9 rounded-md border border-[#377cca] mr-2 p-[2px]"
        />
        <img
          src="/notificationOn.png"
          alt="Notifications"
          className="w-9 h-9 rounded-md border border-[#377cca] mr-2"
        />
        <div className="flex items-center space-x-2 border border-[#377cca] p-2 rounded-md bg-gradient-to-r from-[#12436c] to-[#0a3152] h-10">
          <img
            src="/helmet.png"
            alt="Example"
            className="w-6 h-6 rounded-md border border-[#377cca] mt-auto mb-auto"
          />
          <select className="bg-transparent text-white w-[120px]">
            <option>{username}</option>
          </select>
        </div>
      </div>
    </header>
  );
};