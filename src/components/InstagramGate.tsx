import { useState } from "react";
import { Instagram, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface InstagramGateProps {
  onFollowed: () => void;
}

export const InstagramGate = ({ onFollowed }: InstagramGateProps) => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const instagramUrl = "https://instagram.com/estrategiab2b"; // Atualize para sua conta

  const handleFollowClick = () => {
    window.open(instagramUrl, "_blank");
  };

  const handleConfirmFollow = () => {
    setHasFollowed(true);
    onFollowed();
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50 p-8 shadow-soft">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      <div className="relative z-10 space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary">
          <Instagram className="w-8 h-8 text-primary-foreground" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Siga no Instagram para Continuar
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Para acessar os workflows gratuitos do n8n, siga nossa conta no Instagram.
            É rápido e você terá acesso imediato!
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <Button
            onClick={handleFollowClick}
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
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
              className="w-full"
            >
              Já Segui - Continuar
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium py-3">
              <CheckCircle2 className="h-5 w-5" />
              Obrigado por seguir!
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Ao continuar, você concorda com nossa{" "}
          <Link
            to="/privacy"
            className="text-primary hover:underline"
          >
            Política de Privacidade
          </Link>
        </p>
      </div>
    </Card>
  );
};
