import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Download, FileSpreadsheet, Shield, Zap, Globe } from "lucide-react";
import logo from "@/assets/prospect-in-logo.png";
import heroImage from "@/assets/hero-illustration.jpg";
import chromeLogo from "@/assets/chrome-logo.png";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Extract Attendees",
    description: "Pull all attendees from LinkedIn events with a single click.",
  },
  {
    icon: FileSpreadsheet,
    title: "Export to CSV",
    description: "Export contact lists directly to CSV or your CRM.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description: "No complicated setup — install and start prospecting right away.",
  },
  {
    icon: Shield,
    title: "Save Locally",
    description: "Your data stays with you. Nothing is sent to third-party servers.",
  },
  {
    icon: Globe,
    title: "CRM Integration",
    description: "Connect with HubSpot and other popular CRM systems.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Create professional PDF reports of your contact lists.",
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
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden sm:block">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden sm:block">How It Works</a>
            <Button variant="hero" size="sm">Download</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground font-medium">
              <img src={chromeLogo} alt="Chrome" width={18} height={18} /> Chrome Extension
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Extract prospects from <span className="text-primary">LinkedIn Events</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Pull attendees from LinkedIn events and export them to CSV, PDF, or directly to your CRM — with one click.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                <Download className="w-5 h-5" />
                Install for Free
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={heroImage} alt="Prospect In in action" width={1280} height={720} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything you need for prospecting</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Prospect In makes it easy to find and collect contacts from LinkedIn events.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Install the Extension", desc: "Download Prospect In from the Chrome Web Store." },
              { step: "2", title: "Open a LinkedIn Event", desc: "Navigate to any LinkedIn event and click the extension." },
              { step: "3", title: "Export Attendees", desc: "Pull all attendees and export to CSV, PDF, or your CRM." },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">Start Prospecting Today</h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto">
              Install Prospect In and start collecting leads from LinkedIn events in seconds.
            </p>
            <Button variant="hero" size="lg" className="shadow-xl">
              <Download className="w-5 h-5" />
              Install for Free
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
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Prospect In. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
