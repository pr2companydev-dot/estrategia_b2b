import { useState } from "react";
import { Instagram, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface InstagramGateProps {
  onFollowed: () => void;
}

export const InstagramGate = ({ onFollowed }: InstagramGateProps) => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const instagramUrl = "https://instagram.com/estrategiab2b";

  const handleFollowClick = () => {
    window.open(instagramUrl, "_blank");
    setIsConfirming(true);
  };

  const handleConfirmFollow = () => {
    setHasFollowed(true);
    onFollowed();
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50 p-8 shadow-glow">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      <div className="relative z-10 space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glow animate-in scale-in duration-500">
          <Instagram className="w-10 h-10 text-primary-foreground" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Siga no Instagram para Continuar
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Para acessar os workflows gratuitos do n8n, siga nossa conta no Instagram.
            É rápido e você terá acesso imediato!
          </p>
        </div>

        {isConfirming && !hasFollowed && (
          <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-primary/10 border border-primary/20 animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-primary" />
            <p className="text-sm text-primary font-medium">
              Já seguiu? Confirme abaixo para continuar
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <Button
            onClick={handleFollowClick}
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-base"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Seguir no Instagram
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          {!hasFollowed ? (
            <Button
              onClick={handleConfirmFollow}
              variant="outline"
              size="lg"
              className="w-full hover:bg-muted transition-all duration-300"
              disabled={!isConfirming}
            >
              {isConfirming ? "Já Segui - Continuar" : "Clique em 'Seguir' primeiro"}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium py-3 bg-primary/10 rounded-lg animate-in scale-in">
              <CheckCircle2 className="h-5 w-5" />
              Obrigado por seguir! Redirecionando...
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Ao continuar, você concorda com nossa{" "}
            <Link
              to="/privacy"
              className="text-primary hover:underline font-medium"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};
