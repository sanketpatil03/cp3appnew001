import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User } from "lucide-react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if user is first time
    const isFirstTimeUser = !localStorage.getItem("inductionComplete");
    
    if (isFirstTimeUser) {
      navigate("/induction");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branded */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary flex-col justify-between p-12 text-primary-foreground">
        <div>
          <div className="mb-16">
            <h1 className="text-5xl font-light mb-2">phyzii</h1>
            <p className="text-sm opacity-90 uppercase tracking-wider">PHARMA CRM</p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-light leading-tight">
              Begin your<br />
              <span className="font-semibold">Digital Transformation</span><br />
              journey...
            </h2>
          </div>
        </div>

        <div className="bg-primary-dark rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-semibold">
              DID YOU KNOW
            </div>
            <span className="text-3xl">?</span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            You can share educational resources and marketing materials with doctors directly through
            the app, enhancing your engagement efforts.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-6">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-light text-primary mb-8">
              Hi, Prakash Patil
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                Enter your password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                  className="pr-12 h-12 text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                />
                <label htmlFor="keep-logged-in" className="text-sm text-muted-foreground cursor-pointer">
                  Keep me logged in
                </label>
              </div>
              <button type="button" className="text-sm text-primary hover:underline">
                Need help logging in?
              </button>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              LOGIN
            </Button>
          </form>

          <div className="border border-border rounded-lg p-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">Maximum Width</p>
            <p className="text-2xl font-semibold text-foreground">416px</p>
            <p className="text-sm text-primary">client logo placeholder area</p>
            <p className="text-sm text-muted-foreground">Maximum Height</p>
            <p className="text-xl font-semibold text-foreground">160px</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
