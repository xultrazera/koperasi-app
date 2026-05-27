export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-xl p-10 rounded-xl">
        <h1 className="text-2xl font-bold">
          Koperasi Online
        </h1>

        <input
          placeholder="Username"
          className="border p-2 w-full mt-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mt-2"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Login
        </button>
      </div>
    </div>
  );
}