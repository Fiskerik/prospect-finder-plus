const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> April 14, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
          <p>Prospect In ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our Chrome extension.</p>

          <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>Prospect In processes data locally on your device. We do not collect, store, or transmit your personal data to any external servers. All attendee data extracted from LinkedIn events remains on your computer.</p>

          <h2 className="text-xl font-semibold text-foreground">3. How We Use Information</h2>
          <p>The extension processes publicly available LinkedIn event attendee information solely to enable you to export it in formats such as CSV, PDF, or to your CRM. This processing happens entirely within your browser.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Data Storage</h2>
          <p>All data is stored locally using your browser's built-in storage mechanisms. We do not have access to any data you extract or export.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Third-Party Services</h2>
          <p>If you choose to export data to a third-party CRM (e.g., HubSpot), that data transfer is governed by the respective CRM's privacy policy. We encourage you to review their policies before exporting.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@prospectin.app" className="text-primary hover:underline">support@prospectin.app</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
