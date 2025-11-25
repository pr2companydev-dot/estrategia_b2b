import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstagramGate } from "@/components/InstagramGate";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";

const Downloads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    // Check if cart is empty
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione workflows ao carrinho antes de fazer o download",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [cart, navigate, toast]);

  const handleDownload = async () => {
    try {
      // Download each workflow JSON file
      for (const workflow of cart) {
        const response = await fetch(`/workflows/${workflow.filename}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = workflow.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      toast({
        title: "Download concluído! 🎉",
        description: `${cart.length} workflows foram baixados com sucesso`,
      });
      
      clearCart();
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao baixar os workflows",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Step 1: No user and hasn't followed Instagram
  if (!user && !hasFollowed) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <ScrollToTop />
        <Header showBackButton backUrl="/cart" backLabel="Voltar ao Carrinho" />
        <div className="max-w-2xl mx-auto space-y-8 py-16 px-6 animate-in fade-in duration-500">

          <div className="text-center space-y-4 mb-8">
            <ShoppingCart className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl font-bold tracking-tight">
              Etapa 1 de 2
            </h1>
            <p className="text-xl text-muted-foreground">
              Siga-nos no Instagram para continuar
            </p>
            <p className="text-sm text-muted-foreground">
              {cart.length} workflows no carrinho
            </p>
          </div>

          <InstagramGate onFollowed={() => setHasFollowed(true)} />
        </div>
      </div>
    );
  }

  // Step 2: Followed Instagram but not logged in
  if (!user && hasFollowed) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <ScrollToTop />
        <Header showBackButton backUrl="/cart" backLabel="Voltar ao Carrinho" />
        <div className="max-w-2xl mx-auto space-y-8 py-16 px-6 animate-in fade-in duration-500">

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Etapa 2 de 2
            </h1>
            <p className="text-xl text-muted-foreground">
              Faça login com Google para baixar
            </p>
            <p className="text-sm text-muted-foreground">
              {cart.length} workflows no carrinho
            </p>
          </div>

          <Card className="p-8 shadow-soft text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Última Etapa!</h2>
                <p className="text-muted-foreground">
                  Use sua conta Google para continuar
                </p>
              </div>
              <GoogleAuthButton />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Logged in - show download
  return (
    <div className="min-h-screen bg-gradient-hero">
      <ScrollToTop />
      <Header showBackButton backUrl="/cart" backLabel="Voltar ao Carrinho" />
      <div className="max-w-4xl mx-auto space-y-8 py-16 px-6 animate-in fade-in duration-500">

        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Parabéns! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Seus workflows estão prontos para download
          </p>
        </div>

        {/* Download Card */}
        <Card className="p-8 shadow-glow bg-gradient-to-br from-card to-card/50">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                <Download className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {cart.length} Workflows Selecionados
              </h2>
              <p className="text-muted-foreground">
                Todos os workflows que você escolheu
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 px-4">
              {cart.map((workflow) => (
                <div
                  key={workflow.id}
                  className="p-4 rounded-lg bg-muted/50 text-left"
                >
                  <h3 className="font-semibold mb-1">{workflow.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar {cart.length} Workflows Agora
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3 text-center">
            Como usar os workflows?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            <li>✓ Instale o n8n na sua máquina ou use a versão cloud</li>
            <li>✓ Importe os arquivos .json no seu workspace</li>
            <li>✓ Configure as credenciais necessárias</li>
            <li>✓ Execute e personalize conforme sua necessidade</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Downloads;
