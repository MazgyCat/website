import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { StarburstBadge } from '../ui/StarburstBadge';


export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-[400px]">
      <Card className="w-full max-w-md bg-[#15171C] border-2 border-[#2A2D36] relative overflow-hidden">
        <div className="absolute -top-6 -right-6 rotate-12">
          <StarburstBadge text={isLogin ? "LOG IN" : "SIGN UP"} className="w-20 h-20" />
        </div>
        
        <CardHeader>
          <CardTitle className="font-display font-black text-2xl text-[#F4F6FA] uppercase tracking-tight">
            {isLogin ? 'WELCOME BACK' : 'JOIN THE CHAOS'}
          </CardTitle>
          <p className="text-[#A9B1C3] text-sm font-mono uppercase tracking-widest mt-1">
            {isLogin ? 'ENTER THE MAYHEM' : 'CREATE YOUR AGENT ID'}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A9B1C3] uppercase">EMAIL</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0B0C0F] border-[#2A2D36] text-[#F4F6FA] focus:border-[#FF2D8F]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#A9B1C3] uppercase">PASSWORD</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0B0C0F] border-[#2A2D36] text-[#F4F6FA] focus:border-[#FF2D8F]"
                required
              />
            </div>
            {error && (
              <p className="text-[#FF2D8F] text-xs font-mono bg-[#FF2D8F]/10 p-2 border border-[#FF2D8F]/20">
                ERROR: {error.toUpperCase()}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-[#FF2D8F] text-[#0B0C0F] font-bold hover:bg-[#FF2D8F]/90 transition-colors"
              disabled={loading}
            >
              {loading ? 'PROCESSING...' : (isLogin ? 'ACCESS GRANTED' : 'REGISTER AGENT')}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t border-[#2A2D36] pt-4 mt-2">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#A9B1C3] text-xs font-mono hover:text-[#FF2D8F] transition-colors uppercase"
          >
            {isLogin ? "Don't have an ID? Register here" : "Already an agent? Log in here"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
