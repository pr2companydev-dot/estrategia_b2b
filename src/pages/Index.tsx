import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InstagramGate } from "@/components/InstagramGate";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { supabase } from "@/integrations/supabase/client";
import { Download, Workflow, Zap } from "lucide-react";

const Index = () => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/downloads");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/downloads");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow mb-4">
            <Workflow className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Workflows n8n
            </span>
            <br />
            Gratuitos para Você
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatize seus processos com workflows prontos. Basta seguir no
            Instagram e fazer login para acessar.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Download className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Download Gratuito</h3>
            <p className="text-sm text-muted-foreground">
              Acesso completo aos workflows
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Zap className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Fácil de Usar</h3>
            <p className="text-sm text-muted-foreground">
              Importe e customize rapidamente
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Workflow className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Pronto para Produção</h3>
            <p className="text-sm text-muted-foreground">
              Workflows testados e funcionais
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="max-w-md mx-auto space-y-6">
          {!hasFollowed ? (
            <InstagramGate onFollowed={() => setHasFollowed(true)} />
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-8 rounded-2xl bg-card shadow-soft">
                <h2 className="text-2xl font-bold mb-4">
                  Faça Login para Continuar
                </h2>
                <p className="text-muted-foreground mb-6">
                  Use sua conta Google para acessar os downloads
                </p>
                <GoogleAuthButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
