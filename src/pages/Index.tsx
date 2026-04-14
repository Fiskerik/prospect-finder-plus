import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Download, FileSpreadsheet, Shield, Zap, Globe } from "lucide-react";
import logo from "@/assets/prospect-in-logo.png";
import heroImage from "@/assets/hero-illustration.jpg";

const features = [
  {
    icon: Users,
    title: "Extrahera deltagare",
    description: "Hämta alla deltagare från LinkedIn-events med ett enda klick.",
  },
  {
    icon: FileSpreadsheet,
    title: "Exportera till CSV",
    description: "Exportera kontaktlistor direkt till CSV eller din CRM.",
  },
  {
    icon: Zap,
    title: "Snabb & enkel",
    description: "Ingen komplicerad setup — installera och börja prospektera direkt.",
  },
  {
    icon: Shield,
    title: "Spara lokalt",
    description: "Din data stannar hos dig. Inget skickas till tredjepartsservrar.",
  },
  {
    icon: Globe,
    title: "CRM-integration",
    description: "Koppla ihop med HubSpot och andra populära CRM-system.",
  },
  {
    icon: Download,
    title: "PDF-export",
    description: "Skapa professionella PDF-rapporter av dina kontaktlistor.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Prospect In" width={36} height={36} />
            <span className="text-xl font-bold text-foreground">Prospect In</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden sm:block">Funktioner</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden sm:block">Hur det fungerar</a>
            <Button variant="hero" size="sm">Ladda ner</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground font-medium">
              <Zap className="w-4 h-4" /> Chrome Extension
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Hämta prospekt från <span className="text-primary">LinkedIn Events</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Extrahera deltagare från LinkedIn-events och exportera dem till CSV, PDF eller direkt till ditt CRM — med ett klick.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                <Download className="w-5 h-5" />
                Installera gratis
              </Button>
              <Button variant="outline" size="lg">
                Se demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={heroImage} alt="Prospect In i aktion" width={1280} height={720} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Allt du behöver för prospektering</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Prospect In gör det enkelt att hitta och samla in kontakter från LinkedIn-events.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Så fungerar det</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Installera tillägget", desc: "Ladda ner Prospect In från Chrome Web Store." },
              { step: "2", title: "Öppna ett LinkedIn-event", desc: "Gå till valfritt LinkedIn-event och klicka på tillägget." },
              { step: "3", title: "Exportera deltagare", desc: "Hämta alla deltagare och exportera till CSV, PDF eller CRM." },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto text-primary-foreground text-xl font-bold">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground text-lg">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="gradient-hero rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">Börja prospektera idag</h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto">
              Installera Prospect In och börja samla in leads från LinkedIn-events på några sekunder.
            </p>
            <Button variant="hero" size="lg" className="shadow-xl">
              <Download className="w-5 h-5" />
              Installera gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Prospect In" width={24} height={24} />
            <span className="font-semibold text-foreground text-sm">Prospect In</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Prospect In. Alla rättigheter förbehållna.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
