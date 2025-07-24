import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { status, userData } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-full bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] flex items-center justify-center py-16">
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-10 sm:p-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-6 drop-shadow-md">
            {status ? `Welcome back, ${userData?.name || "User"} 👋` : "Welcome to Aarthik 💸"}
          </h1>

          <p className="text-lg sm:text-xl text-gray-800 mb-10">
            {status
              ? "Effortlessly manage your finances and stay in control. Your dashboard awaits!"
              : "Track your income and expenses seamlessly. Join FinTrack and level up your financial game."}
          </p>

          {status ? (
            <Link
              to="/dashboard"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 border border-indigo-600 text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg transition"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


