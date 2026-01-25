"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { HomeIcon, SettingsIcon, UserIcon, AlertCircleIcon, CheckmarkCircleIcon } from "@hugeicons/core-free-icons";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-display text-5xl font-bold tracking-wider text-primary animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,theme(colors.primary),45%,theme(colors.foreground),55%,theme(colors.primary))] bg-[length:250%_100%]">
            Paul&apos;s Next.js Bootstrap
          </h1>
          <p className="text-xl text-muted-foreground font-sans">
            Bootstrapped with Paul&apos;s preferred Next.js configuration
          </p>
          <div className="flex gap-3">
            <Badge variant="outline">Next.js 16</Badge>
            <Badge variant="secondary">Tailwind v4</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>
        </div>

        <Separator />

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Separator />

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area. You can put anything here.</p>
              </CardContent>
            </Card>
            <Card className="border border-brand">
              <CardHeader>
                <CardTitle className="text-brand">Brand Card</CardTitle>
                <CardDescription>With brand color accent</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-brand hover:bg-brand/90 text-brand-foreground">
                  Brand Button
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Form Elements */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Form Elements</h2>
          <Card className="border">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={4} />
              </div>
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Alerts */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Alerts</h2>
          <Alert>
            <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert with some information.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              Something went wrong! This is an error message.
            </AlertDescription>
          </Alert>
        </section>

        <Separator />

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        <Separator />

        {/* Icons */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Hugeicons</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <HugeiconsIcon icon={HomeIcon} className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Home</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HugeiconsIcon icon={SettingsIcon} className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Settings</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HugeiconsIcon icon={UserIcon} className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">User</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircleIcon} className="h-8 w-8 text-primary" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Typography</h2>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-bold">Display Heading (Chakra Petch)</h1>
            <h2 className="text-2xl font-semibold font-sans">Sans Heading (Share Tech Mono)</h2>
            <p className="text-base font-sans">
              Regular body text using the default sans font. This is how most of your content will look.
            </p>
            <p className="text-sm text-muted-foreground font-sans">
              Muted text for secondary information and descriptions.
            </p>
            <code className="font-mono text-sm bg-muted px-2 py-1">
              Monospace text for code (Share Tech Mono)
            </code>
          </div>
        </section>

        <Separator />

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-8 font-sans">
          <p>Built with Next.js, Tailwind CSS v4, and shadcn/ui</p>
          <p className="mt-1">Ready to start building!</p>
        </footer>
      </div>
    </main>
  );
}