import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const BRIDGE_URL = "https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com";

const ConsentIssuer = () => {
  const { toast } = useToast();
  const [grantee, setGrantee] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sql = async (query: string) => {
    const res = await fetch(`${BRIDGE_URL}/lambda/invoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        functionName: "troy-sql-executor",
        payload: { sql: query },
      }),
    });
    const data = await res.json();
    return JSON.parse(data.result.body);
  };

  const issueConsent = async () => {
    if (!grantee.trim()) {
      toast({ title: "Error", description: "Grantee ID required", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const expiresAt = new Date(Date.now() + 660 * 1000).toISOString();
      await sql(`INSERT INTO consent_grants (grantor_id, grantee_id, consent_type, scope, expires_at, status) VALUES ('sovereign', '${grantee}', 'data_access', '{"level":"standard"}', '${expiresAt}', 'active')`);
      toast({ title: "Consent Granted", description: `660ss consent issued to ${grantee}` });
      setGrantee("");
    } catch (e) {
      toast({ title: "Error", description: "Failed to issue consent", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Neural Consent System
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Issue Consent</CardTitle>
            <CardDescription>Grant 660ss time-limited access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="grantee">Grantee ID</Label>
              <Input id="grantee" placeholder="agent_id or user_id" value={grantee} onChange={(e) => setGrantee(e.target.value)} />
            </div>
            <Button onClick={issueConsent} disabled={isLoading} className="w-full">
              {isLoading ? "Issuing..." : "🚀 Issue Consent Grant"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsentIssuer;
