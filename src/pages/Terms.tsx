const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> April 24, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Provider</h2>
          <p>
            Prospect In ("we", "our", or "us") is operated from Sweden. Contact:{" "}
            <a href="mailto:eaconsulting.supp@gmail.com" className="text-primary hover:underline">
              eaconsulting.supp@gmail.com
            </a>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Acceptance of terms</h2>
          <p>By installing or using the Prospect In Chrome extension (the "Extension"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not install or use the Extension.</p>

          <h2 className="text-xl font-semibold text-foreground">3. Description of service</h2>
          <p>The Extension lets you extract publicly available attendee information from LinkedIn events you visit and export it to CSV, PDF, or supported CRM platforms (e.g., HubSpot, Salesforce). All extraction happens locally in your browser and is initiated by you.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Free tier &amp; paid credits</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>The free tier allows limited exports per event without an account.</li>
            <li>Full exports require credits purchased through Stripe.</li>
            <li>Credits do not expire but are non-refundable once consumed (see §8).</li>
            <li>Promo codes are limited to one use per user; reused codes are blocked automatically.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">5. Acceptable use</h2>
          <p>You agree to use the Extension lawfully and responsibly. You must NOT:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use extracted data for spam, harassment, deception, or illegal outreach.</li>
            <li>Circumvent LinkedIn's rate limits, security measures, or technical protections.</li>
            <li>Resell, redistribute, or expose the Extension's functionality as your own service.</li>
            <li>Use the Extension to scrape data from non-public profiles or pages requiring elevated permissions.</li>
            <li>Use the Extension in violation of GDPR, CAN-SPAM, CCPA, or any other applicable law.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">6. Relationship with LinkedIn</h2>
          <p>
            Prospect In is an independent tool and is <strong className="text-foreground">not affiliated with, endorsed by, or sponsored by LinkedIn Corporation</strong>.
            "LinkedIn" is a trademark of LinkedIn Corporation. You are solely responsible for ensuring your use of the
            Extension complies with{" "}
            <a href="https://www.linkedin.com/legal/user-agreement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              LinkedIn's User Agreement
            </a>.
            We recommend extracting only data that is reasonably necessary, respecting users' privacy choices,
            and never contacting people who have indicated they do not wish to be contacted.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Your data &amp; privacy</h2>
          <p>The Extension processes data locally on your device. See our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for full details on what is collected, why, and how it is protected.</p>

          <h2 className="text-xl font-semibold text-foreground">8. Refunds (EU consumer rights)</h2>
          <p>
            EU consumers have a 14-day right of withdrawal under Directive 2011/83/EU. By purchasing credits and
            using them within this period, you expressly request immediate performance and acknowledge that you
            lose the right of withdrawal once credits are consumed. Unused credits remain refundable on request
            within 14 days of purchase.
          </p>

          <h2 className="text-xl font-semibold text-foreground">9. Intellectual property</h2>
          <p>All rights in the Extension — including code, design, and branding — belong to Prospect In. You receive a limited, revocable, non-exclusive license to use the Extension for its intended purpose. You may not copy, modify, reverse-engineer, or redistribute it without written permission.</p>

          <h2 className="text-xl font-semibold text-foreground">10. Disclaimer of warranties</h2>
          <p>The Extension is provided "as is" and "as available", without warranties of any kind, express or implied. We do not guarantee uninterrupted operation, error-free results, or that LinkedIn's site structure will remain compatible.</p>

          <h2 className="text-xl font-semibold text-foreground">11. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, Prospect In shall not be liable for any indirect, incidental, consequential, or punitive damages, or for lost profits or data, arising from your use of the Extension. Our total aggregate liability shall not exceed the amount you paid us in the 12 months preceding the claim. Nothing in these Terms limits liability for gross negligence, intent, or any liability that cannot be excluded under Swedish or EU law.</p>

          <h2 className="text-xl font-semibold text-foreground">12. Termination</h2>
          <p>We may suspend or terminate access to the Extension or your account at any time if you breach these Terms or misuse the service. You may stop using the Extension at any time by uninstalling it.</p>

          <h2 className="text-xl font-semibold text-foreground">13. Changes to these terms</h2>
          <p>We may update these Terms from time to time. Material changes will be announced on this page with a new revision date. Continued use after changes constitutes acceptance.</p>

          <h2 className="text-xl font-semibold text-foreground">14. Governing law &amp; jurisdiction</h2>
          <p>
            These Terms are governed by the laws of <strong className="text-foreground">Sweden</strong>, without regard to its conflict-of-laws rules.
            Any dispute shall be resolved exclusively by the courts of Sweden, with Stockholm District Court
            (<em>Stockholms tingsrätt</em>) as the court of first instance, unless mandatory consumer-protection
            law of your country of residence grants you the right to bring proceedings in your local courts.
          </p>

          <h2 className="text-xl font-semibold text-foreground">15. Contact</h2>
          <p>Prospect In, Sweden — <a href="mailto:eaconsulting.supp@gmail.com" className="text-primary hover:underline">eaconsulting.supp@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
