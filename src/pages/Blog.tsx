import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import logo from "@/assets/prospect-in-logo.png";

export const blogPosts = [
  {
    slug: "gather-clients-at-linkedin-events",
    title: "How to Gather Clients at LinkedIn Events with Prospect In",
    excerpt:
      "A step-by-step playbook for turning LinkedIn event attendees into qualified pipeline — using Prospect In to extract, enrich, and import leads to your CRM.",
    date: "2026-05-11",
    readTime: "8 min read",
    tags: ["LinkedIn", "Lead Generation", "Prospecting", "CRM", "HubSpot"],
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog — LinkedIn Prospecting & Lead Generation Tips | Prospect In";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "Practical guides on LinkedIn lead generation, prospecting at events, and exporting attendees to HubSpot, Salesforce and other CRMs.";
    if (meta) meta.setAttribute("content", desc);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Prospect In" width={36} height={36} />
            <span className="text-xl font-bold text-foreground">Prospect In</span>
          </Link>
          <Button variant="hero" size="sm" asChild>
            <a
              href="https://chromewebstore.google.com/detail/prospect-in/nofakbgapbfghkpdlnkfaenigenlppdg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4" />
              Install
            </a>
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Blog</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Tactics, playbooks and updates on LinkedIn prospecting, lead generation and CRM workflows.
            </p>
          </header>

          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">{post.title}</h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        · {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary">
                        Read article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 Prospect In. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Blog;
