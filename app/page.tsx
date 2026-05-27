"use client";

export default function Home() {
  // CONFIG DATABASE
  const supabaseUrl = "ISI_URL_SUPABASE_MU";
  const supabaseAnonKey = "ISI_ANON_KEY_MU";

  const jalankanLogin = async (event: any) => {
    event.preventDefault();
    
    const usernameInput = (document.getElementById("txt_user") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("txt_pass") as HTMLInputElement).value;
    const infoError = document.getElementById("info_error");

    if (!infoError) return;
    infoError.innerText = "";

    if (!usernameInput || !passwordInput) {
      infoError.innerText = "Username dan Kata Sandi wajib diisi!";
      return;
    }

    try {
      // Ambil data langsung lewat API Supabase tanpa library jembatan
      const respon = await fetch(`${supabaseUrl}/rest/v1/nasabah?username=eq.${usernameInput}`, {
        method: "GET",
        headers: {
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json"
        }
      });

      const dataNasabah = await respon.json();

      if (!dataNasabah || dataNasabah.length === 0) {
        infoError.innerText = "Username tidak ditemukan!";
      } else {
        const user = dataNasabah[0];
        if (user.password !== passwordInput) {
          infoError.innerText = "Kata sandi yang Anda masukkan salah!";
        } else {
          alert(`Selamat Datang, ${user.nama}!\nTotal Tabungan Anda: Rp ${Number(user.tabungan).toLocaleString()}`);
        }
      }
    } catch (err) {
      infoError.innerText = "Gagal terhubung ke database Supabase.";
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />

      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
          
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-white uppercase">Koperasi Simpan Pinjam</h1>
            <p className="text-sm font-medium text-blue-400 tracking-widest uppercase mt-1">Serba Usaha</p>
          </div>

          <div id="info_error" className="mb-4 rounded-xl bg-red-500/10 text-center text-sm font-medium text-red-400"></div>

          <form onSubmit={jalankanLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Username</label>
              <input id="txt_user" type="text" placeholder="Masukkan Username" className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kata Sandi</label>
              <input id="txt_pass" type="password" placeholder="Masukkan Kata Sandi" className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500" />
            </div>

            <button type="submit" className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 active:scale-[0.98] uppercase tracking-wider">
              Masuk
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
