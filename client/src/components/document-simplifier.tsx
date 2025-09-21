import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import FileUpload from "./file-upload.tsx";
import LoadingSpinner from "./loading-spinner.tsx";
import ResultsDisplay from "./results-display.tsx";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { SimplifyResponse } from "@shared/schema";

export default function DocumentSimplifier() {
  const [text, setText] = useState("");
  const [currentTab, setCurrentTab] = useState("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<SimplifyResponse | null>(null);
  const { toast } = useToast();

  const textMutation = useMutation({
    mutationFn: async (documentText: string) => {
      const response = await apiRequest("POST", "/api/simplify", { text: documentText });
      return response.json() as Promise<SimplifyResponse>;
    },
    onSuccess: (data) => {
      setResults(data);
      toast({
        title: "Document Simplified Successfully",
        description: "Your legal document has been converted to simple language.",
      });
    },
    onError: (error) => {
      console.error("Error simplifying document:", error);
      toast({
        title: "Simplification Failed",
        description: "Unable to simplify the document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const imageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("document", file);
      
      const response = await fetch("/api/simplify-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process image");
      }

      return response.json() as Promise<SimplifyResponse>;
    },
    onSuccess: (data) => {
      setResults(data);
      toast({
        title: "Document Processed Successfully",
        description: "Text extracted and simplified from your uploaded image.",
      });
    },
    onError: (error) => {
      console.error("Error processing image:", error);
      toast({
        title: "Image Processing Failed",
        description: error.message || "Unable to process the uploaded image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTextSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some legal document text to simplify.",
        variant: "destructive",
      });
      return;
    }

    if (text.length > 10000) {
      toast({
        title: "Text Too Long",
        description: "Please limit your text to 10,000 characters.",
        variant: "destructive",
      });
      return;
    }

    textMutation.mutate(text);
  };

  const handleSubmit = () => {
    if (currentTab === "file" && selectedFile) {
      imageMutation.mutate(selectedFile);
    } else if (currentTab === "text") {
      handleTextSubmit();
    }
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    imageMutation.mutate(file);
  };

  const handleNewDocument = () => {
    setResults(null);
    setText("");
    setSelectedFile(null);
  };

  const isLoading = textMutation.isPending || imageMutation.isPending;

  if (results) {
    return (
      <ResultsDisplay 
        results={results} 
        onNewDocument={handleNewDocument}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Upload or Paste Your Legal Document
            </h3>
            <p className="text-muted-foreground">
              अपना कानूनी दस्तावेज़ अपलोड करें या टेक्स्ट पेस्ट करें | Upload image or paste text of your legal document
            </p>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" data-testid="tab-text-input">
                <i className="fas fa-keyboard mr-2"></i>
                Text Input
              </TabsTrigger>
              <TabsTrigger value="file" data-testid="tab-file-upload">
                <i className="fas fa-upload mr-2"></i>
                File Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Legal Document Text / कानूनी दस्तावेज़ का टेक्स्ट
                  </label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your legal document text here... / यहाँ अपने कानूनी दस्तावेज़ का टेक्स्ट पेस्ट करें..."
                    className="h-64 resize-none"
                    data-testid="textarea-document-text"
                  />
                  <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                    <span data-testid="text-character-count">{text.length} characters</span>
                    <span>Max: 10,000 characters</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Or Upload Document Image / या दस्तावेज़ की इमेज अपलोड करें
                  </label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="file" className="space-y-6">
              <FileUpload onFileUpload={handleFileUpload} />
            </TabsContent>
          </Tabs>

          <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2 text-secondary"></i>
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-trash-alt mr-2 text-secondary"></i>
                <span>Auto-deleted after 24hrs</span>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || (currentTab === "text" && !text.trim()) || (currentTab === "file" && !selectedFile)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105"
              data-testid="button-simplify-document"
            >
              <i className="fas fa-magic mr-2"></i>
              Simplify Document / सरल बनाएं
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
