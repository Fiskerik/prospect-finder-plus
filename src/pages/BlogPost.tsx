import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import logo from "@/assets/prospect-in-logo.png";
import { blogPosts } from "./Blog";

const POSTS: Record<string, { title: string; description: string; date: string; readTime: string; content: JSX.Element }> = {
  "gather-clients-at-linkedin-events": {
    title: "How to Gather Clients at LinkedIn Events with Prospect In",
    description:
      "A practical playbook for B2B founders, SDRs and marketers: turn LinkedIn event attendees into qualified pipeline using Prospect In and your CRM.",
    date: "2026-05-11",
    readTime: "8 min read",
    content: (
      <>
        <p>
          LinkedIn events — webinars, virtual summits, product launches, in-person meetups — are one of the most
          underrated sources of warm B2B leads on the internet. Anyone who clicks <em>Attend</em> is publicly raising
          their hand and saying "I care about this topic." For a founder, SDR or growth marketer, that signal is gold.
        </p>
        <p>
          The problem: LinkedIn doesn't let you export attendees, and copy-pasting names from an attendee list of 2,000
          people is not a strategy. That's exactly why we built <strong>Prospect In</strong> — a Chrome extension that
          extracts LinkedIn event attendees in one click and exports them to CSV, PDF, HubSpot, Salesforce and other
          CRMs.
        </p>

        <h2>Why LinkedIn events are a goldmine for prospecting</h2>
        <ul>
          <li><strong>Intent-rich audience.</strong> People only register for events they actually care about.</li>
          <li><strong>Pre-qualified by topic.</strong> A "Series A SaaS finance" event filters your ICP for free.</li>
          <li><strong>Warm opener.</strong> "Saw we both attended X" is a natural, non-spammy first line.</li>
          <li><strong>Compounding pipeline.</strong> Five events a month = thousands of targeted contacts per quarter.</li>
        </ul>

        <h2>The 5-step playbook</h2>

        <h3>1. Find the right events</h3>
        <p>
          Use LinkedIn's event search and filter for your industry, region and topic. Look for events organized by
          adjacent vendors, communities and conferences your buyers attend. Save 5–10 upcoming events per week into a
          shortlist.
        </p>

        <h3>2. Register and extract attendees with Prospect In</h3>
        <p>
          Click <em>Attend</em> (this unlocks the attendee list), then open the event page and click the Prospect In
          extension. It will pull every attendee available to you — name, headline, company, role — directly in your
          browser, no servers involved. Export to CSV with a single click.
        </p>

        <h3>3. Qualify against your ICP</h3>
        <p>
          Open the CSV in Google Sheets or Excel and filter by job title, seniority, company size or industry keywords.
          A good rule of thumb: keep only the top 10–20% that match your ideal customer profile. Quality crushes volume
          on LinkedIn outreach.
        </p>

        <h3>4. Push to HubSpot, Salesforce or your CRM</h3>
        <p>
          Use Prospect In's CRM export to send the qualified list straight into HubSpot, Salesforce, Pipedrive or Zoho
          as a tagged list (e.g. <code>event-source: SaaSConnect-May-2026</code>). Tagging lets you measure ROI per
          event later.
        </p>

        <h3>5. Reach out with context, not a pitch</h3>
        <p>
          The opener writes itself: reference the event, the speaker, or a specific session. Example:
        </p>
        <blockquote>
          "Hey {`{firstName}`}, noticed we both signed up for {`{eventName}`}. Curious — are you exploring this because
          of {`{specific pain}`}? I work with a few {`{ICP}`} on exactly that."
        </blockquote>
        <p>
          Skip the pitch in message one. Earn the reply, then earn the meeting.
        </p>

        <h2>A realistic example</h2>
        <p>
          Imagine a "Future of B2B Marketing" virtual summit with 1,800 attendees. With Prospect In you extract them in
          under a minute. Filter for VPs and Heads of Marketing at companies with 50–500 employees in EU/US: ~140
          contacts. Send 30 personalized connection requests per day for a week. Conservative numbers — 35% accept,
          15% reply, 4% book a call — net you <strong>~6 qualified meetings from one event</strong>.
        </p>

        <h2>Stay safe and compliant</h2>
        <ul>
          <li>Only contact people with a lawful basis (GDPR Art. 6) — legitimate interest covers most B2B outreach.</li>
          <li>Always include an easy way to opt out and honor it immediately.</li>
          <li>Don't blast generic templates — LinkedIn penalizes accounts that get reported as spam.</li>
          <li>
            Prospect In runs <strong>only when you click it</strong>, processes data <strong>locally in your browser</strong>,
            and respects LinkedIn's rate limits to keep your account safe.
          </li>
        </ul>

        <h2>TL;DR</h2>
        <p>
          LinkedIn events are the cheapest, warmest source of B2B pipeline most teams ignore because attendee lists are
          painful to extract. Prospect In removes that friction: <strong>install the extension, attend the event,
          export the list, push to your CRM, and reach out with context</strong>. Do this consistently and you'll build
          a steady pipeline of clients sourced from events your ICP already chose to attend.
        </p>

        <div className="not-prose mt-10 rounded-2xl gradient-hero p-8 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-3">
            Start gathering clients from LinkedIn events
          </h3>
          <p className="text-primary-foreground/80 mb-6">
            Install Prospect In free and export your first attendee list in under a minute.
          </p>
          <Button variant="hero" size="lg" className="shadow-xl" asChild>
            <a
              href="https://chromewebstore.google.com/detail/prospect-in/nofakbgapbfghkpdlnkfaenigenlppdg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-5 h-5" />
              Install for Free
            </a>
          </Button>
        </div>
      </>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : undefined;
  const meta = slug ? blogPosts.find((p) => p.slug === slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Prospect In Blog`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", post.description);
  }, [post]);

  if (!post || !meta) return <Navigate to="/blog" replace />;

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
        <article className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <header className="mb-10 space-y-4">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readTime}
            </p>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary prose-a:text-primary">
            {post.content}
          </div>
        </article>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 Prospect In. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
