"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

  const styleBox = {
    backgroundColor: "#1c2430",
    padding: "30px",
    borderRadius: "15px",
    color: "white",
    width: "300px",
    textAlign: "center" as const,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  };

  // TAMPILAN DASHBOARD (SETELAH LOGIN)
  if (dataNasabah) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}>
        <div style={styleBox}>
          <h2>Halo, {dataNasabah.name}</h2>
          <p>Total Tabungan Anda:</p>
          <h1 style={{ color: "#3b82f6" }}>Rp {dataNasabah.tabungan.toLocaleString()}</h1>
          <p>Total Hutang:</p>
          <h2 style={{ color: "#ef4444" }}>Rp {dataNasabah.hutang.toLocaleString()}</h2>
          <button onClick={() => setDataNasabah(null)} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>Keluar</button>
        </div>
      </div>
    );
  }

  // TAMPILAN LOGIN (DESAIN AWAL KAMU)
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <div style={styleBox}>
        <h3>KOPERASI SIMPAN PINJAM</h3>
        <p style={{ fontSize: "0.8em", color: "#60a5fa" }}>SERBA USAHA</p>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <input id="username" type="text" placeholder="USERNAME" style={{ padding: "10px", borderRadius: "5px" }} required />
          <input id="password" type="password" placeholder="KATA SANDI" style={{ padding: "10px", borderRadius: "5px" }} required />
          <button id="btn-masuk" type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            {loading ? "MEMERIKSA..." : "MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
}
