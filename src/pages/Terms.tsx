const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> April 14, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By installing or using the Prospect In Chrome extension ("Extension"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Extension.</p>

          <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
          <p>Prospect In is a browser extension that allows users to extract publicly available attendee information from LinkedIn events and export it in various formats.</p>

          <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
          <p>You are responsible for ensuring that your use of the Extension complies with all applicable laws and regulations, including LinkedIn's Terms of Service. You agree not to use the Extension for spamming, harassment, or any unlawful purpose.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
          <p>All rights, title, and interest in the Extension, including its design, code, and branding, are owned by Prospect In. You may not copy, modify, or distribute the Extension without our permission.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Disclaimer of Warranties</h2>
          <p>The Extension is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Prospect In shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Extension.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of the Extension after changes constitutes acceptance of the new Terms.</p>

          <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@prospectin.app" className="text-primary hover:underline">support@prospectin.app</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
