import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookies-accepted");
    if (!hasAccepted) {
      // Show banner after 1 second
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookies-accepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-bottom-5 duration-500">
      <Card className="relative overflow-hidden shadow-glow border-2 border-border/50 backdrop-blur-lg bg-card/95">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
        
        <button
          onClick={handleReject}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Cookie className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Usamos cookies 🍪</h3>
              <p className="text-sm text-muted-foreground">
                Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:underline font-medium"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Aceitar
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1"
            >
              Rejeitar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
