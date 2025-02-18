import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, Eye, EyeOff, Mail } from "lucide-react";

const URL = process.env.REACT_APP_BACKEND_URL;
export default function Login({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("login response==========", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // localStorage.setItem("musicAccessToken", data.accessToken);
        localStorage.setItem(
          "musicUserData",
          JSON.stringify({
            accessToken: data.accessToken,
            email: data.email,
            isAdmin: data.isAdmin,
            name: data.name,
          })
        );
        onLogin(); 
        navigate("/artists"); // Redirect to dashboard
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${URL}/auth/recover-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setResetSuccess(true);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //     <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
  //       <div className="text-center">
  //         <Music className="mx-auto h-12 w-12 text-indigo-600" />
  //         <h2 className="mt-6 text-3xl font-bold text-gray-900">
  //           Welcome back
  //         </h2>
  //       </div>
  //       {error && <div className="text-red-500 text-center">{error}</div>}
  //       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
  //         <div className="space-y-4">
  //           <div>
  //             <label
  //               htmlFor="email"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Enter Email here
  //             </label>
  //             <input
  //               id="email"
  //               name="email"
  //               type="email"
  //               required
  //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //               value={formData.email}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, email: e.target.value })
  //               }
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="password"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Password
  //             </label>
  //             <input
  //               id="password"
  //               name="password"
  //               type="password"
  //               required
  //               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //               value={formData.password}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, password: e.target.value })
  //               }
  //             />
  //           </div>
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           {loading ? "Signing in..." : "Sign in"}
  //         </button>
  //       </form>

  //       <div className="text-center">
  //         <p className="text-sm text-gray-600">
  //           Don't have an account?{" "}
  //           <button
  //             onClick={() => navigate('/signup')}
  //             className="font-medium text-indigo-600 hover:text-indigo-500"
  //           >
  //             Sign up
  //           </button>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
  if (isResetMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <Mail className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Reset Password
            </h2>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}
          {resetSuccess && (
            <div className="text-green-500 text-center">
              Password reset instructions have been sent to your email.
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Sending..." : "Send Reset Instructions"}
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsResetMode(false)}
            className="mt-4 w-full text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Music className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
        </div>
        
        {error && <div className="text-red-500 text-center">{error}</div>}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Email here
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsResetMode(true)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
