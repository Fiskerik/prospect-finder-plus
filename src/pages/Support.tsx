const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold text-foreground mb-6">Support</h1>
        <p className="text-muted-foreground mb-4">
          Need help with Prospect In? We're here to assist you.
        </p>
        <p className="text-muted-foreground mb-4">
          For any questions, issues, or feedback, please reach out to us at:
        </p>
        <a
          href="mailto:eaconsulting.supp@gmail.com"
          className="text-primary hover:underline font-medium text-lg"
        >
          eaconsulting.supp@gmail.com
        </a>
        <p className="text-muted-foreground mt-6">
          We typically respond within 24–48 hours.
        </p>
      </div>
    </div>
  );
};

export default Support;
