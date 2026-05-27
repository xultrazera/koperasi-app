"use client";

export default function Home() {
  // CONFIG DATABASE - MASUKKAN DATA ASLI KAMU DI SINI
  const supabaseUrl = "https://moorscjicysjgfdabpxm.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3JzY2ppY3lzamdmZGFicHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjAyNDgsImV4cCI6MjA5NTQzNjI0OH0.NUzQSBtq4qAveVhqyoZdapSvy-HD0hdlQ0i9eT4eays";

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    const usernameInput = (document.getElementById("username") as HTMLInputElement)?.value || "";
    const passwordInput = (document.getElementById("password") as HTMLInputElement)?.value || "";
    const pesanErrorBox = document.getElementById("error-box");
    const tombolMasuk = document.getElementById("btn-masuk");

    if (!pesanErrorBox || !tombolMasuk) return;

    pesanErrorBox.innerText = "";
    pesanErrorBox.style.display = "none";
    tombolMasuk.innerText = "MEMERIKSA...";
    (tombolMasuk as HTMLButtonElement).disabled = true;

    const userClean = usernameInput.trim();
    const passClean = passwordInput.trim();

    if (!userClean || !passClean) {
      pesanErrorBox.innerText = "Username dan Kata Sandi wajib diisi!";
      pesanErrorBox.style.display = "block";
      tombolMasuk.innerText = "MASUK";
      (tombolMasuk as HTMLButtonElement).disabled = false;
      return;
    }

    try {
      const urlTujuan = `${supabaseUrl}/rest/v1/nasabah?username=eq.${encodeURIComponent(userClean)}`;
      
      const respon = await fetch(urlTujuan, {
        method: "GET",
        headers: {
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json"
        }
      });

      if (!respon.ok) {
        pesanErrorBox.innerText = `Database Error: ${respon.status} - Periksa RLS/Kunci`;
        pesanErrorBox.style.display = "block";
        return;
      }

      const dataNasabah = await respon.json();

      if (!dataNasabah || dataNasabah.length === 0) {
        pesanErrorBox.innerText = "Username tidak ditemukan!";
        pesanErrorBox.style.display = "block";
      } else {
        const user = dataNasabah[0];
        if (user.password !== passClean) {
          pesanErrorBox.innerText = "Kata sandi yang Anda masukkan salah!";
          pesanErrorBox.style.display = "block";
        } else {
          alert(`Selamat Datang, ${user.nama}!\nTotal Tabungan Anda: Rp ${Number(user.tabungan).toLocaleString()}`);
        }
      }
    } catch (err) {
      pesanErrorBox.innerText = "Gagal terhubung ke database. Periksa internet.";
      pesanErrorBox.style.display = "block";
    } finally {
      tombolMasuk.innerText = "MASUK";
      (tombolMasuk as HTMLButtonElement).disabled = false;
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

          {/* Kotak Info Error */}
          <div 
            id="error-box" 
            style={{ display: "none" }}
            className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-sm font-medium text-red-400"
          ></div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input 
                id="username"
                type="text"
                placeholder="Masukkan Username" 
                className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <input 
                id="password"
                type="password"
                placeholder="Masukkan Kata Sandi" 
                className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button 
              id="btn-masuk"
              type="submit"
              className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 active:scale-[0.98] transition-all uppercase tracking-wider disabled:opacity-50"
            >
              MASUK
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
