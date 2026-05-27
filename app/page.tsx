"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [pesanError, setPesanError] = useState("");
  const [sedangLoading, setSedangLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError("");
    setSedangLoading(true);

    if (!usernameInput || !passwordInput) {
      setPesanError("Username dan Kata Sandi wajib diisi!");
      setSedangLoading(false);
      return;
    }

    try {
      const { data: nasabah, error } = await supabase
        .from("nasabah")
        .select("*")
        .eq("username", usernameInput)
        .slice(0, 1);

      if (error || !nasabah || nasabah.length === 0) {
        setPesanError("Username tidak ditemukan!");
      } else {
        const user = nasabah[0];
        if (user.password !== passwordInput) {
          setPesanError("Kata sandi yang Anda masukkan salah!");
        } else {
          alert(`Selamat Datang, ${user.nama}!\nTotal Tabungan Anda: Rp ${Number(user.tabungan).toLocaleString()}`);
        }
      }
    } catch (err) {
      setPesanError("Terjadi gangguan koneksi ke database.");
    } finally {
      setSedangLoading(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      />

      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 font-sans">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
          
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-white uppercase">
              Koperasi Simpan Pinjam
            </h1>
            <p className="text-sm font-medium text-blue-400 tracking-widest uppercase mt-1">
              Serba Usaha
            </p>
          </div>

          {pesanError && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-sm font-medium text-red-400">
              {pesanError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input 
                type="text"
                placeholder="Masukkan Username" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <input 
                type="password"
                placeholder="Masukkan Kata Sandi" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={sedangLoading}
              className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 active:scale-[0.98] transition-all uppercase tracking-wider disabled:opacity-50"
            >
              {sedangLoading ? "Memeriksa..." : "Masuk"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
