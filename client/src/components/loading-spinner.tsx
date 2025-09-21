export default function LoadingSpinner() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative" data-testid="loading-spinner">
              <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Processing Your Document...
            </h3>
            <p className="text-muted-foreground">
              आपका दस्तावेज़ प्रोसेस हो रहा है | Our AI is simplifying your legal document
            </p>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
            <div className="progress-bar h-2 rounded-full w-1/3"></div>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <p>🔍 Analyzing document structure...</p>
            <p>🧠 Processing with AI...</p>
            <p>📝 Generating simplified version...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
