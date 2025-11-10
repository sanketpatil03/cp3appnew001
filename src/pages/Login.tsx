import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateDemoUserButton from "@/components/leave/CreateDemoUserButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Login Successful",
          description: "Welcome back!"
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Left Panel - Branded */}
      <div className="hidden lg:flex lg:w-[410px] xl:w-[430px] bg-primary flex-col justify-between px-10 py-12 text-primary-foreground relative overflow-hidden rounded-tr-[50px] rounded-br-[50px] shadow-2xl">
        <div className="relative z-10">
          {/* Cirrus branding at top */}
          <div className="mb-16">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-normal tracking-wide">cirrus</span>
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* Phyzii logo */}
          <div className="mb-20">
            <h1 className="text-[80px] font-bold mb-0 tracking-tight leading-[0.9] -ml-1">phyzii</h1>
            <p className="text-[10px] opacity-90 uppercase tracking-[0.3em] mt-2 ml-0.5">PHARMA CRM</p>
          </div>
          
          {/* Main tagline */}
          <div className="space-y-0 leading-none">
            <h2 className="text-[42px] font-light leading-[1.15]">
              Begin your
            </h2>
            <h2 className="text-[42px] font-bold leading-[1.15]">
              Digital Transformation
            </h2>
            <h2 className="text-[42px] font-light leading-[1.15]">
              journey...
            </h2>
          </div>
        </div>

        {/* Did you know section */}
        <div className="relative z-10 space-y-5">
          <div className="bg-primary-dark/40 backdrop-blur-md rounded-[28px] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md">
                DID YOU KNOW
              </div>
              <div className="bg-white/25 rounded-full p-1.5">
                <HelpCircle className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-[13px] leading-relaxed opacity-95">
              You can share educational resources and marketing materials with doctors directly through the app, enhancing your engagement efforts.
            </p>
          </div>
          
          {/* Decorative dots */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map((dot) => (
              <div 
                key={dot} 
                className={`h-2 rounded-full transition-all ${
                  dot === 1 ? 'bg-white w-7' : 'bg-white/35 w-2'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F5F5F5]">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center space-y-5">
            <div className="inline-flex items-center justify-center w-[180px] h-[180px] rounded-full bg-[#C5C9CE] mb-1">
              <Mail className="w-[90px] h-[90px] text-white" strokeWidth={1.2} />
            </div>
            <h1 className="text-[38px] font-light text-primary leading-tight">
              Welcome Back
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[15px] font-normal text-gray-600 mb-2.5">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amaan.khan@demo.com"
                className="h-[52px] text-base border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[15px] font-normal text-gray-600 mb-2.5">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-12 h-[52px] text-base border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                  className="w-[18px] h-[18px]"
                />
                <label htmlFor="keep-logged-in" className="text-[13px] text-gray-600 cursor-pointer">
                  Keep me logged in
                </label>
              </div>
              <button type="button" className="text-[13px] text-primary hover:underline font-normal">
                Need help logging in ?
              </button>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-[52px] text-base font-bold bg-primary hover:bg-primary/90 rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wide disabled:opacity-50"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </Button>
          </form>

          {/* Demo User Creation */}
          <div className="pt-6 border-t border-gray-200">
            <div className="text-center mb-3">
              <p className="text-sm text-gray-600">For demo/testing purposes:</p>
            </div>
            <CreateDemoUserButton />
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Demo credentials: amaan.khan@demo.com / aaaa
              </p>
            </div>
          </div>

          {/* Client logo placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center space-y-2.5 mt-10 bg-white/50">
            <p className="text-xs text-gray-500">Maximum Width</p>
            <p className="text-[32px] font-bold text-gray-800 leading-none">416px</p>
            <p className="text-[13px] text-primary font-normal">client logo placeholder area</p>
            <p className="text-xs text-gray-500">Maximum Height</p>
            <p className="text-[22px] font-bold text-gray-800 leading-none">160px</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
