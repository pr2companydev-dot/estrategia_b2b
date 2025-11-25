import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ShoppingCart, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const { toast } = useToast();

  const handleRemove = (id: number, title: string) => {
    removeFromCart(id);
    toast({
      title: "Removido do carrinho",
      description: title,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione workflows antes de fazer o download",
        variant: "destructive",
      });
      return;
    }
    navigate("/downloads");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ScrollToTop />
      <Header showBackButton backUrl="/" backLabel="Continuar Comprando" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-2 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold tracking-tight">
              Seu Carrinho
            </h1>
            <p className="text-muted-foreground">
              {cart.length} {cart.length === 1 ? "workflow" : "workflows"} selecionados
            </p>
          </div>

          {cart.length === 0 ? (
            <Card className="p-12 text-center animate-in scale-in duration-500">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Carrinho Vazio</h2>
              <p className="text-muted-foreground mb-6">
                Adicione alguns workflows para começar
              </p>
              <Button onClick={() => navigate("/")}>
                Ver Workflows
              </Button>
            </Card>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((workflow) => (
                  <Card
                    key={workflow.id}
                    className="p-6 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {workflow.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {workflow.longDescription}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {workflow.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRemove(workflow.id, workflow.title)}
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Checkout */}
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 shadow-glow">
                <div className="space-y-6 text-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Pronto para Baixar?
                    </h2>
                    <p className="text-muted-foreground">
                      Total: {cart.length} workflows gratuitos
                    </p>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Fazer Download Grátis
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Na próxima etapa você precisará seguir no Instagram e fazer login com Google.{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                  </p>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
