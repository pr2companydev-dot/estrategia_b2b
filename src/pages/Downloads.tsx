import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, ShoppingCart, PackageOpen, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstagramGate } from "@/components/InstagramGate";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";

const FOLLOWED_STORAGE_KEY = "estrategia-b2b-followed-instagram";

const Downloads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // Load hasFollowed from localStorage
  const [hasFollowed, setHasFollowed] = useState(() => {
    try {
      return localStorage.getItem(FOLLOWED_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Check if cart is empty
    if (cart.length === 0) {
      const timer = setTimeout(() => {
        toast({
          title: "Carrinho vazio",
          description: "Adicione workflows ao carrinho antes de fazer o download",
          variant: "destructive",
        });
        navigate("/");
      }, 100);
      return () => clearTimeout(timer);
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
  }, [cart.length, navigate, toast]);

  const handleInstagramFollowed = () => {
    setHasFollowed(true);
    try {
      localStorage.setItem(FOLLOWED_STORAGE_KEY, "true");
    } catch (error) {
      console.error("Error saving follow state:", error);
    }
  };

  const handleDownloadIndividual = async () => {
    if (downloading) return;
    
    try {
      setDownloading(true);
      setDownloadProgress(0);
      
      const totalFiles = cart.length;
      
      for (let i = 0; i < cart.length; i++) {
        const workflow = cart[i];
        const response = await fetch(`/workflows/${workflow.filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to download ${workflow.filename}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = workflow.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Update progress
        setDownloadProgress(((i + 1) / totalFiles) * 100);
        
        // Small delay between downloads
        if (i < cart.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
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
      console.error("Download error:", error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao baixar os workflows. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleDownloadZip = async () => {
    if (downloading) return;
    
    try {
      setDownloading(true);
      
      const response = await fetch('/workflows.zip');
      
      if (!response.ok) {
        throw new Error('Failed to download ZIP file');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'n8n-workflows-completo.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download do ZIP concluído! 🎉",
        description: "Todos os workflows foram baixados em um único arquivo",
      });
      
      clearCart();
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("ZIP download error:", error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao baixar o arquivo ZIP. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow mx-auto mb-4">
              <ShoppingCart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Etapa 1 de 2
            </h1>
            <p className="text-xl text-muted-foreground">
              Siga-nos no Instagram para continuar
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <PackageOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{cart.length} workflows no carrinho</span>
            </div>
          </div>

          <InstagramGate onFollowed={handleInstagramFollowed} />
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Etapa 2 de 2
            </h1>
            <p className="text-xl text-muted-foreground">
              Faça login com Google para baixar
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <PackageOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{cart.length} workflows no carrinho</span>
            </div>
          </div>

          <Card className="p-8 shadow-glow text-center bg-gradient-to-br from-card to-card/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Última Etapa!</h2>
                <p className="text-muted-foreground">
                  Use sua conta Google para continuar. É rápido e seguro!
                </p>
              </div>
              <GoogleAuthButton />
              <p className="text-xs text-muted-foreground">
                Seus dados estão seguros. Usamos apenas para identificação.
              </p>
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow mx-auto mb-4 animate-pulse">
            <Download className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
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
              <h2 className="text-2xl font-bold mb-2">
                {cart.length} Workflows Selecionados
              </h2>
              <p className="text-muted-foreground">
                Escolha como deseja fazer o download
              </p>
            </div>

            {downloading && (
              <div className="space-y-2">
                <Progress value={downloadProgress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Baixando... {Math.round(downloadProgress)}%
                </p>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto space-y-3 px-4 py-2">
              {cart.map((workflow, index) => (
                <div
                  key={workflow.id}
                  className="p-4 rounded-lg bg-muted/50 text-left hover:bg-muted/70 transition-colors animate-in slide-in-from-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h3 className="font-semibold mb-1">{workflow.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={handleDownloadIndividual}
                  disabled={downloading}
                  size="lg"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Baixando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Baixar {cart.length} Selecionados
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDownloadZip}
                  disabled={downloading}
                  size="lg"
                  variant="outline"
                  className="w-full font-semibold hover:bg-muted"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Baixando...
                    </>
                  ) : (
                    <>
                      <PackageOpen className="mr-2 h-5 w-5" />
                      Baixar Todos (2.000+ Workflows)
                    </>
                  )}
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-sm text-primary font-medium">
                  💡 Use "Baixar Todos" para obter os 2.000+ workflows completos em um único arquivo ZIP!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-4 text-center flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Como usar os workflows?
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground max-w-2xl mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Instale o n8n na sua máquina ou use a versão cloud</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Importe os arquivos .json no seu workspace do n8n</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Configure as credenciais necessárias (API keys, tokens, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>Execute e personalize conforme sua necessidade</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Downloads;
