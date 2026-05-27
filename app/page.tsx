import Head from "next/head";

export default function Home() {
  return (
    <>
      {/* Script Pengaktif Desain (CDN Tailwind) */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      />

      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 font-sans">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
          
          {/* Judul Koperasi */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-white uppercase">
              Koperasi Simpan Pinjam
            </h1>
            <p className="text-sm font-medium text-blue-400 tracking-widest uppercase mt-1">
              Serba Usaha
            </p>
          </div>

          {/* Form Login */}
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input 
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
                type="password"
                placeholder="Masukkan Kata Sandi" 
                className="w-full rounded-xl border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <button 
              type="button"
              className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all uppercase tracking-wider"
            >
              Masuk
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
