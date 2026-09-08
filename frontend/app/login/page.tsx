"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate 10-digit Indian mobile number
  const isMobileValid = mobileNumber.replace(/\D/g, "").length === 10;
  const isProceedActive = isMobileValid && agreed;
  const isOtpValid = otp.trim().length > 0;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(cleaned);
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isProceedActive) return;
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) return;
    setLoading(true);

    // Mock OTP verification (no real SMS/backend required per requirements)
    setTimeout(() => {
      try {
        localStorage.setItem("1fi_logged_in", "true");
        localStorage.setItem("1fi_user_phone", mobileNumber);
      } catch {}
      router.push("/shop");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between max-w-[430px] mx-auto shadow-2xl relative select-none">
      {/* ────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: Vibrant Purple with subtle Grid overlay        */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative bg-[#712CDC] pt-12 pb-10 px-6 overflow-hidden">
        {/* SVG Grid Overlay Pattern matching the official 1Fi app */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10">
          {/* 1Fi Logo Badge */}
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md shadow-sm">
            <div className="flex items-center text-white font-extrabold text-[20px] tracking-tight">
              <span className="text-[17px] mr-0.5 leading-none">↑</span>
              <span>Fi</span>
            </div>
          </div>

          {/* Headline with italicized "Pay later" */}
          <h1 className="text-white text-[28px] leading-[1.25] font-bold mt-6 tracking-tight">
            Shop today, <span className="italic font-normal text-[#E9D5FF]">Pay later</span> using mutual funds.
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-[13.5px] mt-2.5 font-normal">
            No credit score required. No interest.
          </p>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* BOTTOM SHEET: Pure White with Inputs & Buttons            */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="flex-1 bg-white px-6 pt-7 pb-10 flex flex-col justify-between">
        {step === "mobile" ? (
          <form onSubmit={handleProceed} className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-[24px] font-bold text-[#111827] tracking-tight">
                Mobile Number
              </h2>
              <p className="text-gray-500 text-[13.5px] mt-1 font-normal">
                Enter the number linked to your investments.
              </p>

              {/* Mobile Input Field */}
              <div className="mt-6 flex items-center bg-[#F9FAFB] border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#712CDC] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#712CDC]/15 transition-all">
                <span className="text-gray-700 font-semibold text-[15px] mr-3 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  autoFocus
                  className="w-full bg-transparent outline-none text-[#111827] font-semibold placeholder:text-gray-400 placeholder:font-normal text-[15px]"
                />
              </div>

              {/* T&C Checkbox */}
              <label className="mt-5 flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-[18px] h-[18px] rounded border-gray-300 text-[#712CDC] focus:ring-[#712CDC] focus:ring-offset-0 cursor-pointer accent-[#712CDC]"
                />
                <span className="text-[12.5px] text-gray-600 leading-snug">
                  I agree with{" "}
                  <span className="text-[#712CDC] font-semibold hover:underline">
                    T&C
                  </span>{" "}
                  and{" "}
                  <span className="text-[#712CDC] font-semibold hover:underline">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>

            {/* Proceed Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={!isProceedActive}
                className={`w-full py-4 rounded-full font-semibold text-[15px] transition-all flex items-center justify-center ${
                  isProceedActive
                    ? "bg-[#712CDC] text-white shadow-lg shadow-[#712CDC]/30 hover:bg-[#5E1FB8] active:scale-[0.99] cursor-pointer"
                    : "bg-[#BFA1F2] text-white cursor-not-allowed"
                }`}
              >
                Proceed
              </button>
            </div>
          </form>
        ) : (
          /* ────────────────────────────────────────────────────────── */
          /* STEP 2: Enter OTP (Mock, any number submits successfully)  */
          /* ────────────────────────────────────────────────────────── */
          <form onSubmit={handleOtpSubmit} className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setStep("mobile")}
                  className="text-gray-400 hover:text-gray-700 p-1 -ml-1 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <span className="text-xs font-semibold text-[#712CDC] bg-[#F4F0FF] px-2.5 py-0.5 rounded-full">
                  Step 2 of 2
                </span>
              </div>

              <h2 className="text-[24px] font-bold text-[#111827] tracking-tight">
                Enter OTP
              </h2>
              <p className="text-gray-500 text-[13.5px] mt-1 font-normal">
                Sent to <span className="font-semibold text-gray-800">+91 {mobileNumber}</span>{" "}
                <button
                  type="button"
                  onClick={() => setStep("mobile")}
                  className="text-[#712CDC] text-xs font-bold underline ml-1"
                >
                  Edit
                </button>
              </p>

              {/* OTP Input Field */}
              <div className="mt-6">
                <div className="flex items-center bg-[#F9FAFB] border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#712CDC] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#712CDC]/15 transition-all">
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter any 4 or 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    autoFocus
                    className="w-full bg-transparent outline-none text-[#111827] font-semibold tracking-widest text-[18px] placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal placeholder:text-[14px]"
                  />
                </div>
                <p className="text-[11.5px] text-gray-400 mt-2">
                  💡 Tip: Enter any digits to submit — no real SMS needed.
                </p>
              </div>
            </div>

            {/* Submit OTP Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={!isOtpValid || loading}
                className={`w-full py-4 rounded-full font-semibold text-[15px] transition-all flex items-center justify-center ${
                  isOtpValid && !loading
                    ? "bg-[#712CDC] text-white shadow-lg shadow-[#712CDC]/30 hover:bg-[#5E1FB8] active:scale-[0.99] cursor-pointer"
                    : "bg-[#BFA1F2] text-white cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
