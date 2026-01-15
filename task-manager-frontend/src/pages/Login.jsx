import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login/", {
        username,
        password,
      });

      // Save JWT access token
      localStorage.setItem("token", res.data.access);

      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-600 rounded-lg">
            <LogIn className="text-white" size={28} />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Sign in to manage your tasks
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;