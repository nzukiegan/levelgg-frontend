"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const SocialCallbackPage = () => {
  const router = useRouter();
  const hasRun = useRef(false);
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [showAccountTypeSelection, setShowAccountTypeSelection] = useState(false);
  const [showCountrySelection, setShowCountrySelection] = useState(false);
  const [customSignUp, setCustomSignUp] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string>('');
  const [country_code, setCountryCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTeamCreation, setShowTeamCreation] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');

  const countryMap = new Map([
    ["Afghanistan", "af"],
    ["Albania", "al"],
    ["Algeria", "dz"],
    ["Andorra", "ad"],
    ["Angola", "ao"],
    ["Antigua and Barbuda", "ag"],
    ["Argentina", "ar"],
    ["Armenia", "am"],
    ["Australia", "au"],
    ["Austria", "at"],
    ["Azerbaijan", "az"],
    ["Bahamas", "bs"],
    ["Bahrain", "bh"],
    ["Bangladesh", "bd"],
    ["Barbados", "bb"],
    ["Belarus", "by"],
    ["Belgium", "be"],
    ["Belize", "bz"],
    ["Benin", "bj"],
    ["Bhutan", "bt"],
    ["Bolivia", "bo"],
    ["Bosnia and Herzegovina", "ba"],
    ["Botswana", "bw"],
    ["Brazil", "br"],
    ["Brunei", "bn"],
    ["Bulgaria", "bg"],
    ["Burkina Faso", "bf"],
    ["Burundi", "bi"],
    ["Cabo Verde", "cv"],
    ["Cambodia", "kh"],
    ["Cameroon", "cm"],
    ["Canada", "ca"],
    ["Central African Republic", "cf"],
    ["Chad", "td"],
    ["Chile", "cl"],
    ["China", "cn"],
    ["Colombia", "co"],
    ["Comoros", "km"],
    ["Congo (Congo-Brazzaville)", "cg"],
    ["Costa Rica", "cr"],
    ["Croatia", "hr"],
    ["Cuba", "cu"],
    ["Cyprus", "cy"],
    ["Czech Republic", "cz"],
    ["Democratic Republic of the Congo", "cd"],
    ["Denmark", "dk"],
    ["Djibouti", "dj"],
    ["Dominica", "dm"],
    ["Dominican Republic", "do"],
    ["Ecuador", "ec"],
    ["Egypt", "eg"],
    ["El Salvador", "sv"],
    ["Equatorial Guinea", "gq"],
    ["Eritrea", "er"],
    ["Estonia", "ee"],
    ["Eswatini", "sz"],
    ["Ethiopia", "et"],
    ["Fiji", "fj"],
    ["Finland", "fi"],
    ["France", "fr"],
    ["Gabon", "ga"],
    ["Gambia", "gm"],
    ["Georgia", "ge"],
    ["Germany", "de"],
    ["Ghana", "gh"],
    ["Greece", "gr"],
    ["Grenada", "gd"],
    ["Guatemala", "gt"],
    ["Guinea", "gn"],
    ["Guinea-Bissau", "gw"],
    ["Guyana", "gy"],
    ["Haiti", "ht"],
    ["Honduras", "hn"],
    ["Hungary", "hu"],
    ["Iceland", "is"],
    ["India", "in"],
    ["Indonesia", "id"],
    ["Iran", "ir"],
    ["Iraq", "iq"],
    ["Ireland", "ie"],
    ["Israel", "il"],
    ["Italy", "it"],
    ["Jamaica", "jm"],
    ["Japan", "jp"],
    ["Jordan", "jo"],
    ["Kazakhstan", "kz"],
    ["Kenya", "ke"],
    ["Kiribati", "ki"],
    ["Kuwait", "kw"],
    ["Kyrgyzstan", "kg"],
    ["Laos", "la"],
    ["Latvia", "lv"],
    ["Lebanon", "lb"],
    ["Lesotho", "ls"],
    ["Liberia", "lr"],
    ["Libya", "ly"],
    ["Liechtenstein", "li"],
    ["Lithuania", "lt"],
    ["Luxembourg", "lu"],
    ["Madagascar", "mg"],
    ["Malawi", "mw"],
    ["Malaysia", "my"],
    ["Maldives", "mv"],
    ["Mali", "ml"],
    ["Malta", "mt"],
    ["Marshall Islands", "mh"],
    ["Mauritania", "mr"],
    ["Mauritius", "mu"],
    ["Mexico", "mx"],
    ["Micronesia", "fm"],
    ["Moldova", "md"],
    ["Monaco", "mc"],
    ["Mongolia", "mn"],
    ["Montenegro", "me"],
    ["Morocco", "ma"],
    ["Mozambique", "mz"],
    ["Myanmar (Burma)", "mm"],
    ["Namibia", "na"],
    ["Nauru", "nr"],
    ["Nepal", "np"],
    ["Netherlands", "nl"],
    ["New Zealand", "nz"],
    ["Nicaragua", "ni"],
    ["Niger", "ne"],
    ["Nigeria", "ng"],
    ["North Korea", "kp"],
    ["North Macedonia", "mk"],
    ["Norway", "no"],
    ["Oman", "om"],
    ["Pakistan", "pk"],
    ["Palau", "pw"],
    ["Palestine", "ps"],
    ["Panama", "pa"],
    ["Papua New Guinea", "pg"],
    ["Paraguay", "py"],
    ["Peru", "pe"],
    ["Philippines", "ph"],
    ["Poland", "pl"],
    ["Portugal", "pt"],
    ["Qatar", "qa"],
    ["Romania", "ro"],
    ["Russia", "ru"],
    ["Rwanda", "rw"],
    ["Saint Kitts and Nevis", "kn"],
    ["Saint Lucia", "lc"],
    ["Saint Vincent and the Grenadines", "vc"],
    ["Samoa", "ws"],
    ["San Marino", "sm"],
    ["Sao Tome and Principe", "st"],
    ["Saudi Arabia", "sa"],
    ["Senegal", "sn"],
    ["Serbia", "rs"],
    ["Seychelles", "sc"],
    ["Sierra Leone", "sl"],
    ["Singapore", "sg"],
    ["Slovakia", "sk"],
    ["Slovenia", "si"],
    ["Solomon Islands", "sb"],
    ["Somalia", "so"],
    ["South Africa", "za"],
    ["South Korea", "kr"],
    ["South Sudan", "ss"],
    ["Spain", "es"],
    ["Sri Lanka", "lk"],
    ["Sudan", "sd"],
    ["Suriname", "sr"],
    ["Sweden", "se"],
    ["Switzerland", "ch"],
    ["Syria", "sy"],
    ["Taiwan", "tw"],
    ["Tajikistan", "tj"],
    ["Tanzania", "tz"],
    ["Thailand", "th"],
    ["Timor-Leste", "tl"],
    ["Togo", "tg"],
    ["Tonga", "to"],
    ["Trinidad and Tobago", "tt"],
    ["Tunisia", "tn"],
    ["Turkey", "tr"],
    ["Turkmenistan", "tm"],
    ["Tuvalu", "tv"],
    ["Uganda", "ug"],
    ["Ukraine", "ua"],
    ["United Arab Emirates", "ae"],
    ["United Kingdom", "gb"],
    ["United States", "us"],
    ["Uruguay", "uy"],
    ["Uzbekistan", "uz"],
    ["Vanuatu", "vu"],
    ["Vatican City", "va"],
    ["Venezuela", "ve"],
    ["Vietnam", "vn"],
    ["Yemen", "ye"],
    ["Zambia", "zm"],
    ["Zimbabwe", "zw"],
  ]);

  useEffect(() => {
    setCustomSignUp(localStorage.getItem("customSignUp") === "true");
  }, []);

  useEffect(() => {
    if(customSignUp && backendUrl){
      setAccessToken(localStorage.getItem('access_token'));
      setShowCountrySelection(true);
      setCustomSignUp(false)
    }
  })

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

  useEffect(() => {
    if (!backendUrl || hasRun.current || customSignUp) return;

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

        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        localStorage.setItem("user", JSON.stringify(user));

        setAccessToken(tokens.access);
        setShowCountrySelection(true);
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

  const handleContinue = async () => {
    if (!backendUrl || !accessToken) {
      toast.error("Missing required information");
      return;
    }

    if (!accountType) {
      toast.error("Please select an account type");
      return;
    }

    const isTeamLead = accountType === 'team_lead';
    setIsSubmitting(true);

    try {
      await axios.patch(
        `${backendUrl}/api/player/account-type/`,
        { is_team_lead: isTeamLead },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Account type saved");

      if (isTeamLead) {
        setShowTeamCreation(true);
        setShowAccountTypeSelection(false);
      } else {
        router.push("/home");
      }

    } catch (error) {
      toast.error("Failed to set account type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountrySelection = async () => {
    if(!backendUrl || !accessToken || !country_code){
      toast.error("Country is required");
      return;
    }

    setIsSubmitting(true)

    try {
      await axios.patch(
        `${backendUrl}/api/player/country-code/`,
        { country_code: country_code },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Contry code saved");
      setShowAccountTypeSelection(true);
      setShowCountrySelection(false);
    }catch(err){
      toast.error("Failed to set country code")
    }finally {
      setIsSubmitting(false)
    }
  };

  const handleTeamCreate = async () => {
    if (!backendUrl || !accessToken || !teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${backendUrl}/api/teams/`,
        { name: teamName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const team = res.data;
      setTeamCode(team.code);
      toast.success("Team created successfully");
      router.push("/home");
    } catch (err) {
      toast.error("Failed to create team");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-[#041529] font-bank to-[#0b1f39] text-white">
      {showAccountTypeSelection && (
        <div className="text-center space-y-8 w-full max-w-md px-6">
          <h1 className="text-2xl font-bold">Select Your Account Type</h1>

          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-3 rounded bg-[#0d2645] text-white border border-gray-300"
          >
            <option value="">-- Select an option --</option>
            <option value="team_lead">Team Lead</option>
            <option value="player">Player</option>
          </select>

          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="loader border-white border-t-transparent rounded-full border-2 w-5 h-5 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}

      {showCountrySelection && (
        <div className="text-center space-y-8 w-full max-w-md px-6">
          <h1 className="text-2xl font-bold">Select Your Country</h1>

          <select
            value={country_code}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full p-3 rounded bg-[#0d2645] text-white border border-gray-300"
          >
            <option value="">-- Select your country --</option>
            {Array.from(countryMap.entries()).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCountrySelection}
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="loader border-white border-t-transparent rounded-full border-2 w-5 h-5 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}

      {showTeamCreation && (
        <div className="text-center space-y-6 w-full max-w-md px-6">
          <h1 className="text-2xl font-bold">Create Your Team</h1>

          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="w-full p-3 rounded bg-[#0d2645] text-white border border-gray-300"
          />

          <button
            onClick={handleTeamCreate}
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition disabled:opacity-50 flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="loader border-white border-t-transparent rounded-full border-2 w-5 h-5 animate-spin" />
            ) : (
              "Create Team"
            )}
          </button>

          {teamCode && (
            <div className="bg-gray-800 text-white p-4 rounded shadow mt-4">
              <p className="font-semibold">Share this code with your players:</p>
              <code className="block mt-2 text-lg text-blue-400">{teamCode}</code>
            </div>
          )}
        </div>
      )}

      {!showAccountTypeSelection && !showTeamCreation && !showCountrySelection && (
        <div className="text-center">
          <img src="/footer_logo.png" className="w-[200px] mx-auto" alt="Footer Logo" />
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto mt-16" />
          <p className="mt-4">Finalizing signup...</p>
        </div>
      )}
    </main>
  );
};

export default SocialCallbackPage;