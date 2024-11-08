'use client';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import useUpload from '@/lib/hooks/useUpload';
import { young_serif } from '@/lib/fonts/fonts';
import './globals.css';
import './styles.css';
import Navbar from './components/navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
  const { file, setFile, uploadFile, status } = useUpload();
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    console.log('EVENT', selectedFile, event);
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setFileError('Invalid file type. Please upload a PDF file.');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setFile(selectedFile);
        setFileError(null);
      }
    } else {
      setFileError(null);
      setFile(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('submit', file);
    uploadFile();
  }

  return (
    <main className="container mx-auto p-8">
      <section className="sticky top-0 mb-16">
        <Navbar />
      </section>
      <section className="flex justify-center items-center flex-col w-full">
        <div className="max-w-xl">
          <div className="flex flex-col items-center">
            <h2 className="young-serif text-6xl max-w-xl text-center mb-4">
              Review Legal Documents Fast.
            </h2>
            <span className="text-lg text-center">
              Effortlessly Spot Philippine Laws, Legal Issues and Agreement
              Contradictions with AI-Powered Insights.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex my-4 gap-2">
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button type="submit" disabled={!file}>
              Analyze <ArrowRight />
            </Button>
          </form>
          {fileError && (
            <Alert className="mt-4 border-red-400 text-red-400">
              <AlertCircle className="stroke-red-400 h-4 w-4" />
              <AlertTitle>File Type Error.</AlertTitle>
              <AlertDescription>{fileError}</AlertDescription>
            </Alert>
          )}
        </div>
        {status.error && (
          <div className="text-red-500 mt-4">API Error: {status.error}</div>
        )}
        {status.message && (
          <div className="text-green-500 mt-4">
            API Success: {status.message}
          </div>
        )}
      </section>
    </main>
  );
}
