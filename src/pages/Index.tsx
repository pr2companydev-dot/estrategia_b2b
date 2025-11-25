import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, Workflow, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Estratégia B2B
          </h1>
          <p className="text-xl text-muted-foreground">
            Workflows n8n profissionais para automação de negócios
          </p>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border">
            <h2 className="text-3xl font-semibold mb-4">
              Automatize seus processos com workflows prontos
            </h2>
            <p className="text-muted-foreground mb-8">
              Biblioteca completa de workflows n8n testados e otimizados para produção.
              Economize tempo e aumente a eficiência do seu negócio.
            </p>
            <Link to="/downloads">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Ver Workflows Disponíveis
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border">
            <Workflow className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Workflows Profissionais</h3>
            <p className="text-muted-foreground">
              Todos os workflows são testados, documentados e prontos para produção.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Múltiplas Categorias</h3>
            <p className="text-muted-foreground">
              Automação, Email, AWS, DevOps, Marketing e muito mais.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border">
            <Download className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Download Direto</h3>
            <p className="text-muted-foreground">
              Faça o download e importe diretamente no seu n8n.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
