import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleComplete = () => {
    console.log("Onboarding completed");
    setLocation("/");
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to AI Caller CRM</h1>
          <p className="text-muted-foreground">
            Let's get you set up in just a few steps
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Connect your essential services to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twilio-key">Twilio API Key</Label>
                <Input
                  id="twilio-key"
                  type="password"
                  placeholder="Enter your Twilio API key"
                  data-testid="input-twilio-key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  data-testid="input-openai-key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                <Input
                  id="elevenlabs-key"
                  type="password"
                  placeholder="Enter your ElevenLabs key"
                  data-testid="input-elevenlabs-key"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} data-testid="button-next-step1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>CRM Integration</CardTitle>
              <CardDescription>
                Connect to Zoho CRM for automatic data sync
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zoho-key">Zoho CRM API Key</Label>
                <Input
                  id="zoho-key"
                  type="password"
                  placeholder="Enter your Zoho CRM API key"
                  data-testid="input-zoho-key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zoho-org">Organization ID</Label>
                <Input
                  id="zoho-org"
                  placeholder="Your Zoho organization ID"
                  data-testid="input-zoho-org"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} data-testid="button-back-step2">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} data-testid="button-next-step2">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>All Set!</CardTitle>
              <CardDescription>
                Your AI Caller CRM is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>API keys configured</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>CRM integration connected</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>System ready to make calls</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} data-testid="button-back-step3">
                  Back
                </Button>
                <Button onClick={handleComplete} data-testid="button-complete-onboarding">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
