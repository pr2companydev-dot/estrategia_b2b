import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShoppingCart, Workflow } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  showBackButton?: boolean;
  backUrl?: string;
  backLabel?: string;
}

export const Header = ({ showBackButton, backUrl = "/", backLabel = "Voltar" }: HeaderProps) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {showBackButton ? (
            <Button
              onClick={() => navigate(backUrl)}
              variant="ghost"
            >
              {backLabel}
            </Button>
          ) : (
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Workflow className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Estratégia B2B</h1>
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={() => navigate("/cart")}
              variant="outline"
              className="relative"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
