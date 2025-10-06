import { APIKeyManagement } from "@/components/APIKeyManagement";

export default function APIKeys() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground mt-1">
          Manage your integration credentials
        </p>
      </div>

      <div className="max-w-3xl">
        <APIKeyManagement />
      </div>
    </div>
  );
}
