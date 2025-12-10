import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 1. If already logged in → go home directly
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      navigate("/home", { replace: true });
      return;
    }

    // ✅ 2. Get token from URL after Google login
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // ✅ Clean the URL (remove ?token=...)
      window.history.replaceState({}, document.title, "/login");

      // ✅ Go to home
      navigate("/home", { replace: true });
    } else {
      // ✅ If no token and not logged in → back to roll verify
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-md">
            <span className="text-2xl text-white font-bold">ITM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ITM Connect</h1>
          <p className="text-gray-600">Student Social Network</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Logging you in...
              </h2>
              <p className="text-gray-600">Securing your session</p>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-6 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
