"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://moorscjicysjgfdabpxm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3JzY2ppY3lzamdmZGFicHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjAyNDgsImV4cCI6MjA5NTQzNjI0OH0.NUzQSBtq4qAveVhqyoZdapSvy-HD0hdlQ0i9eT4eays";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [dataNasabah, setDataNasabah] = useState<any>(null);
  const [riwayatTransaksi, setRiwayatTransaksi] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const userIn = (document.getElementById("username") as HTMLInputElement).value;
    const passIn = (document.getElementById("password") as HTMLInputElement).value;

    // 1. Cek Login
    const { data: nasabah, error: errN } = await supabase
      .from("nasabah")
      .select("*")
      .eq("username", userIn)
      .eq("password", passIn)
      .single();

    if (errN || !nasabah) {
      alert("Username atau sandi salah!");
      setLoading(false);
      return;
    }

    // 2. Ambil Riwayat Transaksi (Excel view)
    const { data: transaksi } = await supabase
      .from("transaksi")
      .select("*")
      .eq("username", userIn)
      .order("id", { ascending: true }); // Biar urut dari bulan lama ke baru

    setDataNasabah(nasabah);
    setRiwayatTransaksi(transaksi || []);
    setLoading(false);
  };

  if (dataNasabah) {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "Arial" }}>
        <div style={{ maxWidth: "900px", margin: "auto", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          
          {/* HEADER SEPERTI EXCEL */}
          <table style={{ marginBottom: "20px", fontWeight: "bold" }}>
            <tr><td>No Anggota</td><td>: {dataNasabah.id}</td></tr>
            <tr><td>Nama Anggota</td><td>: {dataNasabah.name.toUpperCase()}</td></tr>
          </table>

          {/* TABEL TRANSAKSI */}
          <div style={{ overflowX: "auto" }}>
            <table border={1} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead style={{ backgroundColor: "#e5e7eb" }}>
                <tr>
                  <th style={{ padding: "10px" }}>Bulan</th>
                  <th>Wajib</th>
                  <th>Sukarela</th>
                  <th>Utang Pokok</th>
                  <th>ADM</th>
                  <th>Saldo</th>
                  <th>Total Bayar</th>
                </tr>
              </thead>
              <tbody>
                {riwayatTransaksi.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px" }}>{item.bulan}</td>
                    <td>{item.wajib.toLocaleString()}</td>
                    <td>{item.sukarela.toLocaleString()}</td>
                    <td>{item.hutang_pokok.toLocaleString()}</td>
                    <td>{item.adm.toLocaleString()}</td>
                    <td style={{ backgroundColor: "#f9fafb" }}>{item.saldo.toLocaleString()}</td>
                    <td style={{ fontWeight: "bold" }}>{item.total_bayar.toLocaleString()}</td>
                  </tr>
                ))}
                {riwayatTransaksi.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: "20px" }}>Belum ada data transaksi bulanan.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <button onClick={() => setDataNasabah(null)} style={{ marginTop: "30px", padding: "10px 20px", cursor: "pointer", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "5px" }}>Keluar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px", backgroundColor: "#0f172a", minHeight: "100vh", color: "white" }}>
      <div style={{ backgroundColor: "#1c2430", padding: "30px", borderRadius: "15px", width: "320px", textAlign: "center" }}>
        <h3>KOPERASI PINJAMAN</h3>
        <p style={{ color: "#60a5fa", fontSize: "0.8em" }}>MASUK UNTUK CEK SALDO</p>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <input id="username" type="text" placeholder="USERNAME" style={{ padding: "12px", borderRadius: "5px", border: "none" }} required />
          <input id="password" type="password" placeholder="KATA SANDI" style={{ padding: "12px", borderRadius: "5px", border: "none" }} required />
          <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            {loading ? "MEMERIKSA..." : "MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
}
