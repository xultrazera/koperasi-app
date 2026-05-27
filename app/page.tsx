"use client";

export default function Home() {
  // CONFIG DATABASE - GANTI DENGAN KUNCI ASLI SUPABASE KAMU
  const supabaseUrl = "https://moorscjicysjgfdabpxm.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3JzY2ppY3lzamdmZGFicHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjAyNDgsImV4cCI6MjA5NTQzNjI0OH0.NUzQSBtq4qAveVhqyoZdapSvy-HD0hdlQ0i9eT4eays";

  const jalankanLogin = async (event: any) => {
    event.preventDefault();
    
    const usernameInput = (document.getElementById("txt_user") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("txt_pass") as HTMLInputElement).value;
    const infoError = document.getElementById("info_error");
    const tombolMasuk = document.getElementById("btn_masuk");

    if (!infoError || !tombolMasuk) return;
    
    // Reset status tampilan awal
    infoError.innerText = "";
    infoError.style.display = "none";
    tombolMasuk.innerText = "Memeriksa...";

    if (!usernameInput || !passwordInput) {
      infoError.innerText = "Username dan Kata Sandi wajib diisi!";
      infoError.style.display = "block";
      tombolMasuk.innerText = "MASUK";
      return;
    }

    try {
      // Membersihkan spasi tak sengaja dari inputan user
      const userClean = usernameInput.trim();
      const passClean = passwordInput.trim();

      // Memanggil API Rest Supabase secara manual yang kompatibel dengan Vercel polosan
      const urlTujuan = `${supabaseUrl}/rest/v1/nasabah?username=eq.${encodeURIComponent(userClean)}`;
      
      const respon = await fetch(urlTujuan, {
        method: "GET",
        headers: {
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json"
        }
      });

      // Jika koneksi ditolak oleh Supabase (Misal karena masalah gembok RLS)
      if (!respon.ok) {
        const teksError = await respon.text();
        infoError.innerText = `Database Menolak: ${respon.status} - Hubungi Admin.`;
        infoError.style.display = "block";
        tombolMasuk.innerText = "MASUK";
        return;
      }

      const dataNasabah = await respon.json();

      if (!dataNasabah || dataNasabah.length === 0) {
        infoError.innerText = "Username tidak ditemukan!";
        infoError.style.display = "block";
      } else {
        const user = dataNasabah[0];
        if (user.password !== passClean) {
          infoError.innerText = "Kata sandi yang Anda masukkan salah!";
          infoError.style.display = "block";
        } else {
          // JIKA BERHASIL COCOK
          alert(`Selamat Datang, ${user.nama}!\nTotal Tabungan Anda: Rp ${Number(user.tabungan).toLocaleString()}`);
        }
      }
    } catch (err) {
      infoError.innerText = "Gagal terhubung. Periksa jaringan internet Anda.";
      infoError.style.display = "block";
    } finally {
      tombolMasuk.innerText = "MASUK";
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 font-sans">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
          
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-white uppercase">Koperasi Simpan Pinjam</h1>
            <p className="text-sm font-medium text-blue-400 tracking-widest uppercase mt-1">Serba Usaha</p>
          </div>

          {/* Kotak Info Error yang Diperbaiki */}
          <div id="info_error" style={{display: "none"}} className="mb-4 rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-center text-sm font-semibold text-red-400"></div>

          <form onSubmit={jalankanLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Username</label>
              <input id="txt_user" type="text" placeholder="Masukkan Username" className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kata Sandi</label>
              <input id="txt_pass" type="password" placeholder="Masukkan Kata Sandi" className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all" />
            </div>

            <button id="btn_masuk" type="submit" className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 active:scale-[0.98] transition-all uppercase tracking-wider">
              MASUK
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
