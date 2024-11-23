import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("competitor");
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({
        name,
        email,
        password,
        accountType
      });
    } catch (err) {}

    // Handle signup logic here

    // If signup is successful and user is a competitor, redirect to onboarding
    if (accountType === "competitor") {
      navigate("/onboarding");
    } else {
      // For spectators, redirect to home/dashboard
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Link
        to="/"
        className="p-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent text-center">
              FitRival
            </h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAccountType("competitor")}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      accountType === "competitor"
                        ? "bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Competitor
                    {accountType === "competitor" && (
                      <p className="text-xs mt-1 text-purple-200">
                        Complete profile after signup
                      </p>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("spectator")}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      accountType === "spectator"
                        ? "bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Spectator
                    {accountType === "spectator" && (
                      <p className="text-xs mt-1 text-purple-200">
                        Follow & vote for athletes
                      </p>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div className="ml-2">
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5" />
              </span>
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
