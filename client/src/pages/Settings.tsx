import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your AI caller preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Your Company" data-testid="input-company-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@company.com" data-testid="input-email" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Preferences</CardTitle>
            <CardDescription>Configure AI caller behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-log to CRM</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically sync calls to Zoho CRM
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-auto-log" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Voice Synthesis</Label>
                <div className="text-sm text-muted-foreground">
                  Use ElevenLabs for natural voice responses
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-voice" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Call Recording</Label>
                <div className="text-sm text-muted-foreground">
                  Record all calls for quality assurance
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-recording" />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} data-testid="button-save-settings">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
