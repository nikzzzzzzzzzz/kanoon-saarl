import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { SimplifyResponse } from "@shared/schema";

interface ResultsDisplayProps {
  results: SimplifyResponse;
  onNewDocument: () => void;
}

export default function ResultsDisplay({ results, onNewDocument }: ResultsDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(results.simplified);
      toast({
        title: "Copied to Clipboard",
        description: "Simplified document text has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = () => {
    // Create a simple text file download since PDF generation would require additional libraries
    const element = document.createElement("a");
    const file = new Blob([
      `ORIGINAL DOCUMENT:\n\n${results.originalText}\n\n\nSIMPLIFIED VERSION:\n\n${results.simplified}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "simplified-document.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: "Your simplified document is being downloaded.",
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">
              Simplified Document / सरलीकृत दस्तावेज़
            </h3>
            <p className="text-muted-foreground">
              Original vs Simplified comparison
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              data-testid="button-copy-clipboard"
            >
              <i className="fas fa-copy mr-2"></i>
              Copy
            </Button>
            <Button 
              onClick={downloadPDF}
              variant="outline"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              data-testid="button-download-document"
            >
              <i className="fas fa-download mr-2"></i>
              Download
            </Button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Original Document */}
          <div className="bg-card rounded-lg shadow-lg border border-border">
            <div className="p-4 border-b border-border bg-muted/20">
              <h4 className="font-semibold text-foreground flex items-center">
                <i className="fas fa-file-alt mr-2 text-muted-foreground"></i>
                Original Document
              </h4>
            </div>
            <div className="p-6">
              <div className="prose prose-sm max-w-none" data-testid="text-original-document">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {results.originalText}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <i className="fas fa-clock mr-2"></i>
                <span>Reading time: ~{Math.ceil(results.originalText.split(' ').length / 200)} minutes</span>
              </div>
            </div>
          </div>

          {/* Simplified Document */}
          <div className="bg-card rounded-lg shadow-lg border border-border border-secondary/30">
            <div className="p-4 border-b border-border bg-secondary/10">
              <h4 className="font-semibold text-foreground flex items-center">
                <i className="fas fa-lightbulb mr-2 text-secondary"></i>
                Simplified Version
              </h4>
            </div>
            <div className="p-6">
              <div className="prose prose-sm max-w-none" data-testid="text-simplified-document">
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {results.simplified}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <i className="fas fa-clock mr-2"></i>
                <span>Reading time: ~{Math.ceil(results.simplified.split(' ').length / 200)} minute</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button 
            onClick={onNewDocument}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-process-new-document"
          >
            <i className="fas fa-plus mr-2"></i>
            Simplify Another Document
          </Button>
          <Button 
            variant="outline"
            className="border-border text-foreground hover:bg-muted"
            data-testid="button-provide-feedback"
          >
            <i className="fas fa-comment mr-2"></i>
            Provide Feedback
          </Button>
        </div>
      </div>
    </main>
  );
}
