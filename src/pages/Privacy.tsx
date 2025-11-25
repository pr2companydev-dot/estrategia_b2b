import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, UserCheck, FileText, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ScrollToTop />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="mb-6 hover-scale"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground text-lg">
              Simples, clara e direta sobre seus dados
            </p>
            <p className="text-sm text-muted-foreground">
              Atualizada em {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Quick Summary */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-in slide-in-from-bottom-3 duration-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Resumo Rápido
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <span>Coletamos apenas email e nome quando você faz login com Google</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <span>Não vendemos seus dados para terceiros, nunca</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <span>Você pode deletar sua conta e dados a qualquer momento</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <span>Usamos cookies apenas para manter você logado</span>
              </li>
            </ul>
          </Card>

          {/* Section 1 */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              1. O Que Coletamos
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Somos minimalistas com dados. Coletamos apenas o essencial:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground">Quando você faz login com Google:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Seu email</li>
                  <li>Seu nome</li>
                  <li>Data de quando você se cadastrou</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground">Automaticamente:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Workflows que você adicionou ao carrinho</li>
                  <li>Páginas que você visitou no site</li>
                  <li>Tipo de navegador e dispositivo</li>
                </ul>
              </div>
              <p className="text-sm italic">
                Não pedimos telefone, endereço, CPF ou qualquer outro dado pessoal adicional.
              </p>
            </div>
          </Card>

          {/* Section 2 */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              2. Como Usamos Seus Dados
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Usamos suas informações apenas para:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">✓ Essencial</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Manter você logado</li>
                    <li>• Liberar os downloads</li>
                    <li>• Melhorar o site</li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">✗ Nunca fazemos</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Vender seus dados</li>
                    <li>• Spam no email</li>
                    <li>• Compartilhar sem permissão</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3 */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-300">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              3. Seus Direitos (LGPD)
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Você tem total controle sobre seus dados:</p>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">👀</span>
                  <div>
                    <p className="font-semibold text-foreground">Ver seus dados</p>
                    <p className="text-sm">Solicite uma cópia de tudo que temos sobre você</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">✏️</span>
                  <div>
                    <p className="font-semibold text-foreground">Corrigir dados</p>
                    <p className="text-sm">Atualize informações incorretas</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">🗑️</span>
                  <div>
                    <p className="font-semibold text-foreground">Deletar tudo</p>
                    <p className="text-sm">Remova sua conta e dados permanentemente</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-semibold text-foreground">Exportar dados</p>
                    <p className="text-sm">Baixe seus dados em formato legível</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong className="text-foreground">Quer exercer algum direito?</strong><br />
                  É só nos enviar um email que respondemos em até 48 horas.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 4 - Cookies */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-400">
            <h2 className="text-2xl font-bold mb-4">🍪 Sobre Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cookies são pequenos arquivos que guardam informações no seu navegador.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Cookies essenciais</p>
                  <p className="text-sm">Para manter você logado e o carrinho funcionando. <strong className="text-foreground">Não podem ser desativados.</strong></p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Cookies de análise</p>
                  <p className="text-sm">Para entender como você usa o site e melhorá-lo. <strong className="text-foreground">Você pode desativar.</strong></p>
                </div>
              </div>
              <p className="text-sm">
                Não usamos cookies para rastreamento invasivo ou publicidade.
              </p>
            </div>
          </Card>

          {/* Section 5 - Security */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-500">
            <h2 className="text-2xl font-bold mb-4">🔐 Segurança</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Levamos a segurança dos seus dados a sério:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Conexão criptografada (HTTPS)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Login seguro via Google OAuth</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Banco de dados protegido</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Acesso restrito aos dados</span>
                </li>
              </ul>
              <p className="text-sm italic">
                Porém, nenhum sistema é 100% seguro. Se detectarmos alguma violação, você será notificado imediatamente.
              </p>
            </div>
          </Card>

          {/* Section 6 - Changes */}
          <Card className="p-8 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-600">
            <h2 className="text-2xl font-bold mb-4">📝 Mudanças nesta Política</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Podemos atualizar esta política de tempos em tempos. Quando fizermos mudanças importantes, vamos:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary">1.</span>
                  <span>Atualizar a data no topo da página</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">2.</span>
                  <span>Notificar você por email (se a mudança for significativa)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">3.</span>
                  <span>Pedir seu consentimento, se necessário</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4 delay-700">
            <div className="text-center space-y-4">
              <Mail className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Dúvidas?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Se ficou com alguma dúvida sobre privacidade, proteção de dados ou quer exercer seus direitos, fale com a gente:
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-lg">
                  📧 contato@estrategiab2b.com.br
                </p>
                <p className="text-sm text-muted-foreground">
                  Respondemos em até 48 horas úteis
                </p>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => window.open("https://instagram.com/estrategiab2b", "_blank")}
                  variant="outline"
                  className="hover-scale"
                >
                  Ou fale conosco no Instagram
                </Button>
              </div>
            </div>
          </Card>

          {/* Final Note */}
          <Card className="p-6 bg-muted/50 text-center animate-in fade-in delay-1000">
            <p className="text-sm text-muted-foreground">
              Esta política foi escrita em linguagem simples, sem juridiquês desnecessário.<br />
              Acreditamos que transparência é fundamental para a confiança.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Estratégia B2B. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
