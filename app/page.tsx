"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// MASUKKAN DATA ASLI KAMU DI SINI
const supabaseUrl = "https://moorscjicysjgfdabpxm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3JzY2ppY3lzamdmZGFicHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjAyNDgsImV4cCI6MjA5NTQzNjI0OH0.NUzQSBtq4qAveVhqyoZdapSvy-HD0hdlQ0i9eT4eays";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [dataNasabah, setDataNasabah] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const { data, error } = await supabase
      .from("nasabah")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Username atau kata sandi salah!");
    } else {
      setDataNasabah(data);
    }
    setLoading(false);
  };

  if (dataNasabah) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>Selamat Datang, {dataNasabah.name}!</h1>
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
          <p>Total Tabungan: <b>Rp {dataNasabah.tabungan.toLocaleString()}</b></p>
          <p>Total Hutang: <b>Rp {dataNasabah.hutang.toLocaleString()}</b></p>
        </div>
        <button onClick={() => setDataNasabah(null)} style={{ marginTop: "20px", padding: "10px" }}>Keluar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px", margin: "auto" }}>
      <h2>KOPERASI SIMPAN PINJAM</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input id="username" type="text" placeholder="Username" required />
        <input id="password" type="password" placeholder="Kata Sandi" required />
        <button type="submit" disabled={loading}>
          {loading ? "MEMERIKSA..." : "MASUK"}
        </button>
      </form>
    </div>
  );
}
