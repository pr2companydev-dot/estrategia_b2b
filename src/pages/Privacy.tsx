import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate("/")} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-soft">
          <div className="prose prose-blue max-w-none">
            <h1 className="text-4xl font-bold mb-2">Política de Privacidade</h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
              <p className="text-muted-foreground mb-4">
                A Estratégia B2B ("nós", "nosso" ou "nossa") opera o site estrategiab2b.com.br
                (doravante denominado "Serviço"). Esta página informa sobre nossas políticas
                relacionadas à coleta, uso e divulgação de dados pessoais quando você usa nosso
                Serviço e as escolhas que você tem associadas a esses dados.
              </p>
              <p className="text-muted-foreground">
                Usamos seus dados para fornecer e melhorar o Serviço. Ao usar o Serviço, você
                concorda com a coleta e uso de informações de acordo com esta política.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Definições</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Serviço:</strong> refere-se ao site
                  estrategiab2b.com.br operado pela Estratégia B2B.
                </li>
                <li>
                  <strong className="text-foreground">Dados Pessoais:</strong> significa dados sobre
                  um indivíduo vivo que pode ser identificado a partir desses dados (ou dessas
                  informações e outras informações em nossa posse ou que possam vir a estar em nossa
                  posse).
                </li>
                <li>
                  <strong className="text-foreground">Dados de Uso:</strong> são dados coletados
                  automaticamente, gerados pelo uso do Serviço ou pela infraestrutura do Serviço
                  (por exemplo, a duração de uma visita à página).
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> são pequenos arquivos
                  armazenados em seu dispositivo (computador ou dispositivo móvel).
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Coleta e Uso de Informações</h2>
              <p className="text-muted-foreground mb-4">
                Coletamos vários tipos diferentes de informações para diversos fins, a fim de
                fornecer e melhorar nosso Serviço para você.
              </p>

              <h3 className="text-xl font-semibold mb-3">3.1. Tipos de Dados Coletados</h3>

              <h4 className="text-lg font-semibold mb-2">Dados Pessoais</h4>
              <p className="text-muted-foreground mb-3">
                Ao usar nosso Serviço, podemos solicitar que você nos forneça certas informações de
                identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo
                ("Dados Pessoais"). As informações de identificação pessoal podem incluir, mas não
                estão limitadas a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Endereço de e-mail</li>
                <li>Nome e sobrenome</li>
                <li>Informações de perfil do Google (ao fazer login via Google OAuth)</li>
                <li>Cookies e Dados de Uso</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Dados de Uso</h4>
              <p className="text-muted-foreground mb-4">
                Também podemos coletar informações sobre como o Serviço é acessado e usado ("Dados
                de Uso"). Esses Dados de Uso podem incluir informações como o endereço de protocolo
                da Internet do seu computador (por exemplo, endereço IP), tipo de navegador, versão
                do navegador, as páginas do nosso Serviço que você visita, a hora e a data de sua
                visita, o tempo gasto nessas páginas, identificadores exclusivos de dispositivo e
                outros dados de diagnóstico.
              </p>

              <h4 className="text-lg font-semibold mb-2">Dados de Rastreamento e Cookies</h4>
              <p className="text-muted-foreground">
                Usamos cookies e tecnologias de rastreamento semelhantes para rastrear a atividade
                em nosso Serviço e manter certas informações. Os cookies são arquivos com uma
                pequena quantidade de dados que podem incluir um identificador exclusivo anônimo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Uso de Dados</h2>
              <p className="text-muted-foreground mb-3">
                A Estratégia B2B usa os dados coletados para várias finalidades:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fornecer e manter o Serviço</li>
                <li>Notificá-lo sobre mudanças em nosso Serviço</li>
                <li>
                  Permitir que você participe de recursos interativos do nosso Serviço quando
                  escolher fazê-lo
                </li>
                <li>Fornecer suporte ao cliente</li>
                <li>
                  Coletar análises ou informações valiosas para que possamos melhorar o Serviço
                </li>
                <li>Monitorar o uso do Serviço</li>
                <li>Detectar, prevenir e resolver problemas técnicos</li>
                <li>
                  Fornecer notícias, ofertas especiais e informações gerais sobre outros produtos,
                  serviços e eventos que oferecemos
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Base Legal para Processamento de Dados Pessoais (LGPD)
              </h2>
              <p className="text-muted-foreground mb-3">
                A base legal para coleta e uso das informações pessoais descritas nesta Política de
                Privacidade depende dos Dados Pessoais que coletamos e do contexto específico em que
                coletamos as informações:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Você deu consentimento para processar seus Dados Pessoais</li>
                <li>O processamento é necessário para a execução de um contrato com você</li>
                <li>Temos uma obrigação legal de processar seus Dados Pessoais</li>
                <li>O processamento está em nosso interesse legítimo e não é anulado por seus direitos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Retenção de Dados</h2>
              <p className="text-muted-foreground">
                A Estratégia B2B reterá seus Dados Pessoais apenas pelo tempo necessário para os
                fins estabelecidos nesta Política de Privacidade. Reteremos e usaremos seus Dados
                Pessoais na medida necessária para cumprir nossas obrigações legais, resolver
                disputas e fazer cumprir nossos acordos e políticas legais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Transferência de Dados</h2>
              <p className="text-muted-foreground">
                Suas informações, incluindo Dados Pessoais, podem ser transferidas para - e mantidas
                em - computadores localizados fora de seu estado, província, país ou outra
                jurisdição governamental onde as leis de proteção de dados podem diferir daquelas de
                sua jurisdição. Seu consentimento com esta Política de Privacidade seguido por seu
                envio de tais informações representa sua concordância com essa transferência.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Divulgação de Dados</h2>
              
              <h3 className="text-xl font-semibold mb-3">8.1. Requisitos Legais</h3>
              <p className="text-muted-foreground mb-3">
                A Estratégia B2B pode divulgar seus Dados Pessoais na crença de boa fé de que tal
                ação é necessária para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cumprir uma obrigação legal</li>
                <li>Proteger e defender os direitos ou propriedade da Estratégia B2B</li>
                <li>Prevenir ou investigar possíveis irregularidades relacionadas ao Serviço</li>
                <li>Proteger a segurança pessoal dos usuários do Serviço ou do público</li>
                <li>Proteger contra responsabilidade legal</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Segurança de Dados</h2>
              <p className="text-muted-foreground">
                A segurança de seus dados é importante para nós, mas lembre-se de que nenhum método
                de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
                Embora nos esforcemos para usar meios comercialmente aceitáveis ​​para proteger seus
                Dados Pessoais, não podemos garantir sua segurança absoluta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Seus Direitos de Proteção de Dados</h2>
              <p className="text-muted-foreground mb-3">
                A Estratégia B2B visa tomar medidas razoáveis ​​para permitir que você corrija,
                altere, exclua ou limite o uso de seus Dados Pessoais. Se você deseja ser informado
                sobre quais Dados Pessoais mantemos sobre você e se deseja que eles sejam removidos
                de nossos sistemas, entre em contato conosco.
              </p>
              <p className="text-muted-foreground mb-3">
                Em certas circunstâncias, você tem os seguintes direitos de proteção de dados:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Direito de Acesso:</strong> Você tem o direito
                  de solicitar cópias de seus dados pessoais.
                </li>
                <li>
                  <strong className="text-foreground">Direito de Retificação:</strong> Você tem o
                  direito de solicitar que corrijamos qualquer informação que você acredita estar
                  incorreta ou complete informações que você acredita estar incompletas.
                </li>
                <li>
                  <strong className="text-foreground">Direito de Exclusão:</strong> Você tem o
                  direito de solicitar que apaguemos seus dados pessoais, sob certas condições.
                </li>
                <li>
                  <strong className="text-foreground">Direito de Restringir o Processamento:</strong>{" "}
                  Você tem o direito de solicitar que restrinjamos o processamento de seus dados
                  pessoais, sob certas condições.
                </li>
                <li>
                  <strong className="text-foreground">Direito de Oposição ao Processamento:</strong>{" "}
                  Você tem o direito de se opor ao nosso processamento de seus dados pessoais, sob
                  certas condições.
                </li>
                <li>
                  <strong className="text-foreground">Direito à Portabilidade de Dados:</strong> Você
                  tem o direito de solicitar que transfiramos os dados que coletamos para outra
                  organização, ou diretamente para você, sob certas condições.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Provedores de Serviços</h2>
              <p className="text-muted-foreground mb-3">
                Podemos empregar empresas e indivíduos terceirizados para facilitar nosso Serviço
                ("Provedores de Serviços"), para fornecer o Serviço em nosso nome, para executar
                serviços relacionados ao Serviço ou para nos ajudar a analisar como nosso Serviço é
                usado.
              </p>
              <p className="text-muted-foreground">
                Esses terceiros têm acesso aos seus Dados Pessoais apenas para executar essas
                tarefas em nosso nome e são obrigados a não divulgá-los ou usá-los para qualquer
                outra finalidade.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Links para Outros Sites</h2>
              <p className="text-muted-foreground">
                Nosso Serviço pode conter links para outros sites que não são operados por nós. Se
                você clicar em um link de terceiros, será direcionado para o site desse terceiro.
                Aconselhamos fortemente que você revise a Política de Privacidade de cada site que
                visitar. Não temos controle e não assumimos responsabilidade pelo conteúdo,
                políticas de privacidade ou práticas de sites ou serviços de terceiros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Privacidade de Crianças</h2>
              <p className="text-muted-foreground">
                Nosso Serviço não se dirige a menores de 18 anos ("Crianças"). Não coletamos
                intencionalmente informações de identificação pessoal de menores de 18 anos. Se você
                é pai ou responsável e sabe que seu filho nos forneceu Dados Pessoais, entre em
                contato conosco. Se tomarmos conhecimento de que coletamos Dados Pessoais de crianças
                sem verificação do consentimento dos pais, tomaremos medidas para remover essas
                informações de nossos servidores.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                14. Mudanças nesta Política de Privacidade
              </h2>
              <p className="text-muted-foreground">
                Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos
                você sobre quaisquer alterações publicando a nova Política de Privacidade nesta
                página. Você é aconselhado a revisar esta Política de Privacidade periodicamente para
                quaisquer alterações. As alterações a esta Política de Privacidade são efetivas
                quando publicadas nesta página.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Contato</h2>
              <p className="text-muted-foreground mb-3">
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato
                conosco:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">E-mail:</strong> contato@estrategiab2b.com.br
                </li>
                <li>
                  <strong className="text-foreground">Instagram:</strong>{" "}
                  <a
                    href="https://instagram.com/estrategiab2b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @estrategiab2b
                  </a>
                </li>
              </ul>
            </section>

            <section className="mb-8 p-6 bg-muted rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Consentimento</h2>
              <p className="text-muted-foreground">
                Ao usar nosso site, você concorda com nossa Política de Privacidade e concorda com
                seus termos.
              </p>
            </section>
          </div>
        </Card>
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
