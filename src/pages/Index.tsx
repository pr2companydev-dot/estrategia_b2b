import { useState } from "react";
import { Download, Workflow as WorkflowIcon, Zap, FileJson, ShoppingCart, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { workflows } from "@/data/workflows";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  const navigate = useNavigate();
  const { cart, addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", ...Array.from(new Set(workflows.map(w => w.category)))];

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Todos" || workflow.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (workflow: typeof workflows[0]) => {
    addToCart(workflow);
    toast({
      title: "Adicionado ao carrinho!",
      description: workflow.title,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ScrollToTop />
      
      {/* Header with Cart */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WorkflowIcon className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Estratégia B2B</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                onClick={() => navigate("/cart")}
                variant="outline"
                className="relative"
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
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow mb-4">
            <WorkflowIcon className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Workflows n8n
            </span>
            <br />
            Gratuitos para Você
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navegue, adicione ao carrinho e baixe workflows prontos.
            Login necessário apenas no checkout final!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pesquisar workflows por nome, descrição ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-scale transition-all duration-300 animate-in slide-in-from-bottom-3 delay-100">
            <Download className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">100% Gratuito</h3>
            <p className="text-sm text-muted-foreground">
              Todos os workflows grátis
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-scale transition-all duration-300 animate-in slide-in-from-bottom-3 delay-200">
            <Zap className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Pronto para Usar</h3>
            <p className="text-sm text-muted-foreground">
              Importe e customize
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-scale transition-all duration-300 animate-in slide-in-from-bottom-3 delay-300">
            <WorkflowIcon className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Testados</h3>
            <p className="text-sm text-muted-foreground">
              Workflows funcionais
            </p>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              {filteredWorkflows.length} Workflows Disponíveis
            </h3>
            <p className="text-muted-foreground">
              Adicione ao carrinho e baixe todos de uma vez
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow, index) => (
              <Card
                key={workflow.id}
                className="p-6 hover:shadow-glow hover-scale transition-all duration-300 bg-card/80 backdrop-blur-sm flex flex-col animate-in fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-primary shrink-0">
                    <FileJson className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {workflow.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {workflow.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddToCart(workflow)}
                  disabled={isInCart(workflow.id)}
                  className="w-full mt-auto"
                  variant={isInCart(workflow.id) ? "outline" : "default"}
                >
                  {isInCart(workflow.id) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      No Carrinho
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              </Card>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum workflow encontrado com esses critérios
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
