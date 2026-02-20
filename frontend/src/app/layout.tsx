import React from 'react';

// Este es el "cascarón" que viste en tu ejemplo de SocialNest
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Contenedor principal con animaciones suaves */}
      <div className="w-full max-w-[450px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-primary">TP</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Portal de Registro
          </h1>
          <p className="text-sm text-muted-foreground">
            Teleperformance Colombia
          </p>
        </header>

        {/* Aquí es donde se renderizan las páginas (validate o register) */}
        <main className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {children}
        </main>

        <footer className="text-center text-xs text-muted-foreground">
          © 2026 Sistema de Trámites Virtuales
        </footer>
      </div>
    </div>
  );
};