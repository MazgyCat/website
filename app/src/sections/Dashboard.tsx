import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import type { User } from '@supabase/supabase-js';


export function Dashboard({ user }: { user: User }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-animate', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => supabase.auth.signOut();

  return (
    <section ref={sectionRef} className="py-24 bg-[#0B0C0F]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="dash-animate flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="font-display font-black text-4xl text-[#F4F6FA] uppercase tracking-tight">
              AGENT PORTAL
            </h2>
            <p className="text-[#A9B1C3] font-mono text-sm mt-2">
              ID: {user.email?.toUpperCase()}
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-[#2A2D36] text-[#A9B1C3] hover:text-[#FF2D8F] hover:border-[#FF2D8F]"
          >
            TERMINATE SESSION
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dash-animate bg-[#15171C] border-[#2A2D36] md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-mono text-[#FF2D8F] uppercase">RECENT CRIMES (ORDERS)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-[#2A2D36]">
                <p className="text-[#A9B1C3] italic">No evidence found yet.</p>
                <p className="text-[#A9B1C3] text-xs mt-2 uppercase tracking-widest">Go buy some chaos.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="dash-animate bg-[#15171C] border-[#2A2D36]">
            <CardHeader>
              <CardTitle className="text-sm font-mono text-[#FF2D8F] uppercase">ACCOUNT STATUS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#2A2D36] pb-2">
                <span className="text-xs text-[#A9B1C3] font-mono uppercase">TIER</span>
                <span className="text-xs text-[#F4F6FA] font-mono">CHAOS AGENT</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#2A2D36] pb-2">
                <span className="text-xs text-[#A9B1C3] font-mono uppercase">SECURITY</span>
                <span className="text-xs text-[#4ade80] font-mono">ACTIVE</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
