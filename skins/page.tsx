"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getStoredApiKey,
  setStoredApiKey,
  isUserMode,
  clearStoredApiKey,
} from "@/lib/api-key-manager";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Loading03Icon,
  Key01Icon,
  LinkSquare02Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons";

export default function Page() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Admin mode - redirect immediately
    if (!isUserMode()) {
      router.push("/generator");
      return;
    }

    // User mode - check if API key exists
    const storedKey = getStoredApiKey();
    if (storedKey) {
      router.push("/generator");
    }
  }, [router]);

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) {
      setValidationError("Please enter an API key");
      return;
    }

    // Basic format validation
    if (!apiKey.startsWith("sk-ant-")) {
      setValidationError("Invalid API key format. Anthropic API keys start with 'sk-ant-'");
      return;
    }

    setIsValidating(true);
    setValidationError("");
    setValidationSuccess(false);

    try {
      const response = await fetch("/api/validate-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        setStoredApiKey(apiKey);
        setValidationSuccess(true);
        setTimeout(() => {
          router.push("/generator");
        }, 1000);
      } else {
        setValidationError(data.error || "Invalid API key");
      }
    } catch (error) {
      console.error("Validation error:", error);
      setValidationError("Failed to validate API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearKey = () => {
    clearStoredApiKey();
    setApiKey("");
    setValidationError("");
    setValidationSuccess(false);
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Admin mode or has API key - show loading
  if (!isUserMode() || getStoredApiKey()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <HugeiconsIcon icon={Loading03Icon} className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // User mode - show API key input
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
            <HugeiconsIcon icon={Key01Icon} className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Paul's Content Pro</h1>
          <p className="text-muted-foreground text-sm">
            Enter your Anthropic API key to get started
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Anthropic API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setValidationError("");
                setValidationSuccess(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isValidating) {
                  handleValidateAndSave();
                }
              }}
              disabled={isValidating}
              className="font-mono text-sm"
            />
          </div>

          {validationError && (
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {validationSuccess && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4" />
              <AlertDescription>API key validated successfully! Redirecting...</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleValidateAndSave}
            disabled={isValidating || !apiKey.trim()}
            className="w-full"
          >
            {isValidating ? (
              <>
                <HugeiconsIcon icon={Loading03Icon} className="mr-2 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => router.push("/api-key-help")}
              className="w-full text-sm"
            >
              <HugeiconsIcon icon={LinkSquare02Icon} className="mr-2 h-4 w-4" />
              How to get an API key
            </Button>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely in your browser and never sent to our servers. It's
              only used to make requests directly to Anthropic's API.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}