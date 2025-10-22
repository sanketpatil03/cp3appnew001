import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, HelpCircle } from "lucide-react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isFirstTimeUser = !localStorage.getItem("inductionComplete");
    
    if (isFirstTimeUser) {
      navigate("/induction");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Branded */}
      <div className="hidden lg:flex lg:w-[42%] bg-primary flex-col justify-between p-16 text-primary-foreground relative overflow-hidden rounded-tr-[60px] rounded-br-[60px]">
        <div className="relative z-10">
          {/* Cirrus branding at top */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm font-medium tracking-wider">cirrus</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* Phyzii logo */}
          <div className="mb-32">
            <h1 className="text-7xl font-bold mb-0 tracking-tight leading-none">phyzii</h1>
            <p className="text-xs opacity-90 uppercase tracking-[0.25em] mt-1">PHARMA CRM</p>
          </div>
          
          {/* Main tagline */}
          <div className="space-y-2">
            <h2 className="text-5xl font-light leading-tight">
              Begin your
            </h2>
            <h2 className="text-5xl font-bold leading-tight">
              Digital Transformation
            </h2>
            <h2 className="text-5xl font-light leading-tight">
              journey...
            </h2>
          </div>
        </div>

        {/* Did you know section */}
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent text-accent-foreground px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide shadow-lg">
                DID YOU KNOW
              </div>
              <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[15px] opacity-95 leading-relaxed">
              You can share educational resources and marketing materials with doctors directly through the app, enhancing your engagement efforts.
            </p>
          </div>
          
          {/* Decorative dots */}
          <div className="flex justify-center gap-2.5">
            {[1, 2, 3, 4].map((dot) => (
              <div 
                key={dot} 
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  dot === 1 ? 'bg-white w-8' : 'bg-white/40'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-[480px] space-y-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-44 h-44 rounded-full bg-[#D1D5DB] mb-2">
              <User className="w-24 h-24 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-normal text-primary">
              Hi, Prakash Patil
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            <div>
              <label htmlFor="password" className="block text-base font-normal text-gray-700 mb-3">
                Enter your password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                  className="pr-14 h-14 text-lg border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                  className="w-5 h-5"
                />
                <label htmlFor="keep-logged-in" className="text-sm text-gray-600 cursor-pointer">
                  Keep me logged in
                </label>
              </div>
              <button type="button" className="text-sm text-primary hover:underline font-normal">
                Need help logging in ?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              LOGIN
            </Button>
          </form>

          {/* Client logo placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center space-y-3 mt-12">
            <p className="text-sm text-gray-500 font-medium">Maximum Width</p>
            <p className="text-3xl font-semibold text-gray-700">416px</p>
            <p className="text-base text-primary font-medium">client logo placeholder area</p>
            <p className="text-sm text-gray-500 font-medium">Maximum Height</p>
            <p className="text-2xl font-semibold text-gray-700">160px</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
