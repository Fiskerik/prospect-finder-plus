const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> April 24, 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Who we are</h2>
          <p>
            Prospect In ("we", "our", or "us") is a Chrome browser extension operated from Sweden.
            For any privacy-related inquiries you can reach us at{" "}
            <a href="mailto:eaconsulting.supp@gmail.com" className="text-primary hover:underline">
              eaconsulting.supp@gmail.com
            </a>.
          </p>
          <p>
            For the purposes of the EU General Data Protection Regulation (GDPR), Prospect In acts as the
            data controller for the limited account information described below, and as a data processor for
            any LinkedIn data you choose to extract on your own device.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Our privacy principles</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Local-first:</strong> attendee data extracted from LinkedIn never leaves your browser.</li>
            <li><strong className="text-foreground">User-initiated:</strong> the extension only runs when you actively click it.</li>
            <li><strong className="text-foreground">Minimal data:</strong> we only collect what is strictly required for billing and account features.</li>
            <li><strong className="text-foreground">No selling, no advertising:</strong> we never sell, rent, or share your data with advertisers.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. What data is processed</h2>
          <p><strong className="text-foreground">a) Locally on your device (never sent to us):</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Publicly visible attendee information from LinkedIn events you open (name, headline, location, profile URL).</li>
            <li>Your export history and preferences, stored in your browser via <code>chrome.storage.local</code>.</li>
          </ul>
          <p><strong className="text-foreground">b) Account data (only if you sign in or purchase credits):</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Email address and authentication identifier.</li>
            <li>Number of credits purchased and remaining, and the Stripe checkout session ID.</li>
            <li>Promo codes you have redeemed (to prevent reuse).</li>
          </ul>
          <p><strong className="text-foreground">c) Payment data:</strong> handled exclusively by Stripe. We never see or store your full card number. See Stripe's privacy policy at{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/privacy</a>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Chrome permissions we use</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">activeTab</strong> — to read the LinkedIn event page <em>only</em> when you click the extension.</li>
            <li><strong className="text-foreground">storage</strong> — to remember your settings and export history locally.</li>
            <li><strong className="text-foreground">Host permission for linkedin.com</strong> — required to read attendee lists from LinkedIn pages you open yourself.</li>
          </ul>
          <p>We do not use background scripts to monitor your browsing, and we do not access any site other than LinkedIn.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Legal basis (GDPR Art. 6)</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Contract</strong> — to provide the extension and process credit purchases.</li>
            <li><strong className="text-foreground">Legitimate interest</strong> — to prevent fraud and abuse of promo codes.</li>
            <li><strong className="text-foreground">Consent</strong> — for any optional features you explicitly enable.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">6. Data retention</h2>
          <p>
            Local data stays on your device until you uninstall the extension or clear your browser storage.
            Account and billing records are retained for as long as your account exists, plus up to 7 years to
            comply with Swedish accounting law (<em>Bokföringslagen</em> 1999:1078).
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. International transfers</h2>
          <p>
            Account and billing data is stored on servers located in the EU. Stripe may process payment data
            outside the EU under the EU Standard Contractual Clauses.
          </p>

          <h2 className="text-xl font-semibold text-foreground">8. Your rights under GDPR</h2>
          <p>You have the right to access, rectify, erase, restrict, or port your personal data, and to object to processing. To exercise any of these rights, email us at{" "}
            <a href="mailto:eaconsulting.supp@gmail.com" className="text-primary hover:underline">eaconsulting.supp@gmail.com</a>.
            You also have the right to lodge a complaint with the Swedish Authority for Privacy Protection (IMY) at{" "}
            <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">imy.se</a>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">9. LinkedIn data &amp; your responsibility</h2>
          <p>
            Prospect In is a tool — you control what you do with it. When you use the extension on LinkedIn,
            you are acting as the data controller for the personal data you choose to extract. You must:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Have a lawful basis under GDPR for contacting people whose data you collect.</li>
            <li>Respect LinkedIn's User Agreement and any opt-outs.</li>
            <li>Honor unsubscribe requests and data-deletion requests promptly.</li>
            <li>Avoid bulk unsolicited messaging (spam) and harassment.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">10. Children</h2>
          <p>The extension is not directed at anyone under 16 and we do not knowingly collect data from children.</p>

          <h2 className="text-xl font-semibold text-foreground">11. Changes to this policy</h2>
          <p>We may update this policy from time to time. Material changes will be announced on this page with an updated revision date.</p>

          <h2 className="text-xl font-semibold text-foreground">12. Contact</h2>
          <p>Prospect In, Sweden — <a href="mailto:eaconsulting.supp@gmail.com" className="text-primary hover:underline">eaconsulting.supp@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
