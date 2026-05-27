import "./globals.css";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
        
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
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <input 
              type="text"
              placeholder="Masukkan Username" 
              className="w-full rounded-xl border border-slate-600 bg-slate-700/50 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <input 
              type="password"
              placeholder="Masukkan Kata Sandi" 
              className="w-full rounded-xl border border-slate-600 bg-slate-700/50 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <button 
            type="button"
            className="w-full mt-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 active:scale-[0.98] transition-all uppercase tracking-wider"
          >
            Masuk
          </button>
        </form>

      </div>
    </div>
  );
}
