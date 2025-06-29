'use client';
import { Header } from '@/components/shared/Header';
import { Header2 } from '@/components/shared/Header2';
import {
  tournamentCards,
  newsItems
} from '@/mock/mockData';
import { useRef } from 'react';

interface HubLink {
  name: string;
  icon: string;
  selected?: boolean;
  badge?: string;
  badgeColor?: string;
}

export default function BattlefieldHome() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const pages = [];
  for (let i = 0; i < newsItems.length; i += 4) {
    pages.push(newsItems.slice(i, i + 4));
  }
  
  return (
    <main className="hero-gradient min-h-screen text-white relative overflow-hidden bg-[#08182a] font-bahnschrift">
      <img
        src="/player.png"
        alt="Players"
        className="fixed top-20 right-0 w-[200px] h-[auto] z-0 pointer-events-none players-img"
      />
      <Header/>
      <Header2/>

        <div className="relative z-20">
          <div className="flex-1 bg-gradient-to-r from-[#061526] to-[#0b1f30]/70">
            <div className='pt-[48px] bg-gradient-to-r from-[#08182a] to-[#0a3152]/10 ml-[158px]'>
              <div className="flex p-[2px] bg-gradient-to-r from-[#377cca] to-[#0d2a42]/10 rounded-md flex mb-8">
                <div className="flex p-2 bg-gradient-to-r from-[#0e3250] via-[#0f2f49] to-[#0a3152]/10 rounded h-full w-full">
                  <img
                      src="/bfVImg.jpg"
                      alt="Battlefield"
                      className="inset-0 h-[192px] w-[131px] object-cover mr-4 rounded-md"
                    />

                  <div className='mt-auto mb-auto'>
                    <h2 className="text-[38px] tracking-[0.08em] font-bold mb-2 font-bank font-xl mb-4 text-white">
                      BATTLEFIELD REGISTRATION</h2>
                    <p className="text-sm text-gray-300 mb-4">
                        <span>Register for the upcoming tournament by filling out the required information, selecting role</span><br></br>
                        <span>preferences and vital squad info</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <section className="justify-center items-center mt-[100px]">
              <h1 className="text-[38px] tracking-[0.08em] font-semibold font-bank text-center text-white mb-[20px]">SELECT YOUR ROLE</h1>
              <div className='flex justify-center mt-2 p-4 gap-8'>
                <div className='p-[2px] bg-gradient-to-b from-[#15507e] to-transparent rounded'>
                    <div className='justify-center  w-[250px] h-[320px] p-4 pt-[32px] rounded bg-gradient-to-r from-[#0b243c] via-[#0b2137] to-[#0a1b2f]'>
                        <h5 className='text-center tracking-[0.08em] font-bank text-[24px]'>INFANTRY</h5>
                        <img
                        src='/infantry2.png'
                        alt="Battlefield"
                        className="inset-0 w-[150px] object-cover rounded-md mr-auto ml-auto mt-[60px]"
                        />
                    </div>
                </div>
                <div className='p-[2px] bg-gradient-to-b from-[#15507e] to-transparent rounded'>
                    <div className='justify-center  w-[250px] h-[320px] p-4 pt-[32px] rounded bg-gradient-to-r from-[#0a243c] via-[#0a1f34] to-[#0a1d30]'>
                        <h3 className='text-center font-bank tracking-[0.08em] text-[24px]'>ARMOR</h3>
                        <img
                        src='/armour.png'
                        alt="Battlefield"
                        className="inset-0 h-[150px] object-cover rounded-md mr-auto ml-auto mt-[50px]"
                        />
                    </div>
                </div>
                
                <div className='p-[2px] bg-gradient-to-b from-[#15507e] to-transparent rounded'>
                    <div className='justify-center  w-[250px] h-[320px] pt-[32px] p-4 rounded bg-gradient-to-r from-[#0c2741] via-[#0b2238] to-[#0c2032]'>
                        <h3 className='text-center font-bank tracking-[0.08em] text-[24px]'>HELI</h3>
                        <img
                        src='/heli.png'
                        alt="Battlefield"
                        className="inset-0 h-[150px] object-cover rounded-mdmr-auto ml-auto mt-[40px]"
                        />
                    </div>
                </div>
                <div className='p-[2px] bg-gradient-to-b from-[#15507e] to-transparent rounded'>
                    <div className='justify-center w-[250px] h-[320px] pt-[32px] p-4 bg-gradient-to-r from-[#0c2841] to-[#0c2237] rounded'>
                        <h3 className='text-center font-bank tracking-[0.08em] text-[24px]'>JET</h3>
                        <img
                        src='/jet.png'
                        alt="Battlefield"
                        className="inset-0 w-[200px] object-cover rounded-mr-auto ml-auto mt-[20px]"
                        />
                    </div>
                </div>
              </div>
            </section>
            <section className="justify-center items-center mt-[40px]">
                <h1 className="text-[38px] font-bank tracking-[0.08em] font-semibold font-bank text-center mb-[40px]">INTERESTED IN LEADING?</h1>
                <div className='flex justify-center gap-4 mt-[30px]'>
                    <div className="flex justify-center space-x-4">
                        <div className="w-64 h-48 border border-blue-500 rounded-md bg-gradient-to-r from-[#092034] to-[#081724] flex flex-col items-center justify-center space-y-2 shadow-lg">
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-8 h-4 bg-transparent border border-gray-500 rounded peer-checked:bg-blue-500 peer-focus:outline-none transition-colors duration-300"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-3 bg-[#209cf5] rounded transition-all duration-300 peer-checked:translate-x-full"></div>
                            </label><div className="font-bank tracking-[0.08em] text-white font-bold text-[24px] tracking-wide">TEAM CAPTAIN</div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <div className="w-64 h-48 border border-blue-500 rounded-md bg-gradient-to-b from-[#092034] to-[#081724] flex flex-col items-center justify-center space-y-2 shadow-lg">
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-8 h-4 bg-transparent border border-gray-500 rounded peer-checked:bg-blue-500 peer-focus:outline-none transition-colors duration-300"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-3 bg-[#209cf5] rounded transition-all duration-300 peer-checked:translate-x-full"></div>
                            </label><div className="font-bank tracking-[0.08em] text-white font-bold text-[24px] tracking-wide">SQUAD LEAD</div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <div className="w-64 h-48 border border-blue-500 rounded-md bg-gradient-to-b from-[#092034] to-[#081724] flex flex-col items-center justify-center space-y-2 shadow-lg">
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-8 h-4 bg-transparent border border-gray-500 rounded peer-checked:bg-blue-500 peer-focus:outline-none transition-colors duration-300"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-3 bg-[#209cf5] rounded transition-all duration-300 peer-checked:translate-x-full"></div>
                            </label><div className="font-bank tracking-[0.08em] text-white font-bold text-[24px] tracking-wide">NONE</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-14 pb-14'>
                    <button className="bg-gradient-to-r from-[#64bdfc] to-[#209cf5] hover:bg-blue-700 px-4 py-2 rounded font-semibold hover:brightness-110 transition w-80 text-xs">CONTINUE</button>
                </div>
            </section>
         </div>
        </div>
    </main>
  );
}