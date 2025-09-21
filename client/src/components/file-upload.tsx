import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setIsDragActive(false);
    
    if (rejectedFiles.length > 0) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file (JPG or PNG) under 10MB.",
        variant: "destructive",
      });
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload, toast]);

  const onDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    noClick: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
        isDragActive 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary'
      }`}
      data-testid="dropzone-file-upload"
    >
      <input {...getInputProps()} data-testid="input-file-upload" />
      <i className="fas fa-cloud-upload-alt text-4xl text-muted-foreground mb-4"></i>
      <p className="text-foreground font-medium mb-2">
        Drag & drop your document here
      </p>
      <p className="text-muted-foreground text-sm mb-4">
        or click to browse files
      </p>
      <Button 
        onClick={open}
        variant="outline"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        data-testid="button-browse-files"
      >
        <i className="fas fa-folder-open mr-2"></i>
        Browse Files
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Supports: JPG, PNG (Max 10MB)
      </p>
    </div>
  );
}
