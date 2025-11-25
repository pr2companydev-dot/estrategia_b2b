import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Downloads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDownload = () => {
    // For now, this will just show a toast
    // In production, you would implement actual file download
    toast({
      title: "Download iniciado",
      description: "Os workflows do n8n estão sendo baixados...",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Bem-vindo, {user?.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Seus workflows estão prontos para download
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Downloads Card */}
        <Card className="p-8 shadow-soft">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  Workflows n8n - Coleção Completa
                </h2>
                <p className="text-muted-foreground mb-4">
                  Workflows prontos para automatizar seus processos. Inclui
                  exemplos de automação, integrações e muito mais.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                    Automação
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                    Integrações
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                    APIs
                  </span>
                </div>
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Workflows
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-2">Como usar os workflows?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Instale o n8n na sua máquina ou use a versão cloud</li>
            <li>• Importe os arquivos .json no seu workspace</li>
            <li>• Configure as credenciais necessárias</li>
            <li>• Execute e personalize conforme sua necessidade</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Downloads;
