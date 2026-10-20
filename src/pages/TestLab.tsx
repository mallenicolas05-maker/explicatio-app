import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Header } from "@/components/layout/Header";

const LAB_ORIGIN = import.meta.env.VITE_LAB_ORIGIN || "http://localhost:3001";
const LAB_URL = `${LAB_ORIGIN}/test`;
const LOAD_TIMEOUT_MS = 4500;

export default function TestLab() {
  const [frameKey, setFrameKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasTimedOut(false);

    const timeout = window.setTimeout(() => {
      setHasTimedOut(true);
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [frameKey]);

  const showFailure = useMemo(() => hasTimedOut && !isLoaded, [hasTimedOut, isLoaded]);

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />

      <main className="pt-16 lg:pt-20">
        <section className="border-b border-border bg-background">
          <div className="container-editorial py-10 lg:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="section-label mb-4">Test</span>
                <h1 className="editorial-title text-4xl md:text-5xl">Original Explicatio Lab</h1>
                <p className="editorial-copy mt-4 text-sm md:text-base">
                  This route renders the original Lab app directly from its own source folder so the UI stays visually exact.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="editorial-button px-6 py-3"
                  onClick={() => setFrameKey((current) => current + 1)}
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload Lab
                </button>
                <a
                  href={LAB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-button px-6 py-3"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container-editorial py-6 lg:py-8">
          <div className="surface-card relative overflow-hidden p-0">
            {!isLoaded && !showFailure && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/88 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border border-border border-t-foreground" />
                  <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-subtle">
                    Connecting to Explicatio Lab
                  </p>
                </div>
              </div>
            )}

            {showFailure && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/94 p-6 backdrop-blur-sm">
                <div className="surface-card max-w-lg p-8 text-center">
                  <span className="section-label mb-4">Lab unavailable</span>
                  <h2 className="editorial-title text-3xl">The original Lab app is not responding on port 3001.</h2>
                  <p className="editorial-copy mt-4 text-sm">
                    Start the original Next.js app from <span className="font-medium text-foreground">/Users/nicomallen/Documents/Explicatio Lab</span> and then reload this page.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="editorial-button px-6 py-3"
                      onClick={() => setFrameKey((current) => current + 1)}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </button>
                    <a
                      href={LAB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-button px-6 py-3"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Lab Directly
                    </a>
                  </div>
                </div>
              </div>
            )}

            <iframe
              key={frameKey}
              src={LAB_URL}
              title="Explicatio Lab"
              className="block h-[calc(100vh-12rem)] min-h-[720px] w-full border-0 bg-white"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
