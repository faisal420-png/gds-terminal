import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8 selection:bg-emerald-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl z-10 space-y-8 animate-in fade-in duration-1000">
        <header className="space-y-2 text-center md:text-left px-4">
          <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-zinc-100">
            Global Distribution <span className="font-bold text-emerald-500">System</span>
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium">
            Terminal Simulator — Travel Agent Training Environment
          </p>
        </header>

        <Terminal />

        <footer className="px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            <div className="flex gap-4">
              <span className="text-zinc-500">Status: <span className="text-emerald-500/80 animate-pulse">Online</span></span>
              <span>Host: GBLBD-SERVER-01</span>
            </div>
            <div className="flex gap-6">
              <span>Support: A[DATE][DEP][ARR]*[AL]</span>
              <span>Action: CTRL+W (Clear)</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
