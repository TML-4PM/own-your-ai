import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Clock, Lock, AlertTriangle, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BRIDGE_URL = "https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com";

interface ConsentGrant {
  id: string;
  consent_type: string;
  grantee_id: string;
  expires_at: string;
}

interface IntegrityStatus {
  consent_active: number;
  threats: number;
  signal_queue: number;
  disputes: number;
  fighter_mode: string;
}

const ConsentIssuer = () => {
  const { toast } = useToast();
  const [grantee, setGrantee] = useState("");
  const [consentType, setConsentType] = useState("data_access");
  const [expiry, setExpiry] = useState("660");
  const [isLoading, setIsLoading] = useState(false);
  const [grants, setGrants] = useState<ConsentGrant[]>([]);
  const [integrity, setIntegrity] = useState<IntegrityStatus | null>(null);

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

  const loadIntegrity = async () => {
    try {
      const result = await sql(
        "SELECT content FROM dashboard_feeds WHERE feed_id='neural-integrity-stack'"
      );
      if (result.results?.[0]?.content) {
        setIntegrity(result.results[0].content);
      }
    } catch (e) {
      console.error("Failed to load integrity status", e);
    }
  };

  const loadGrants = async () => {
    try {
      const result = await sql(
        "SELECT id, consent_type, grantee_id, expires_at FROM consent_grants WHERE status='active' AND expires_at > NOW() ORDER BY expires_at ASC LIMIT 20"
      );
      setGrants(result.results || []);
    } catch (e) {
      console.error("Failed to load grants", e);
    }
  };

  const issueConsent = async () => {
    if (!grantee.trim()) {
      toast({
        title: "Error",
        description: "Grantee ID is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const expiresAt = new Date(Date.now() + parseInt(expiry) * 1000).toISOString();
      await sql(
        `INSERT INTO consent_grants (grantor_id, grantee_id, consent_type, scope, expires_at, status) VALUES ('sovereign', '${grantee}', '${consentType}', '{"level":"standard"}', '${expiresAt}', 'active')`
      );
      
      toast({
        title: "Consent Granted",
        description: `${consentType} consent issued to ${grantee} for ${expiry}s`,
      });
      
      setGrantee("");
      loadGrants();
      loadIntegrity();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to issue consent",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCountdown = (expiresAt: string) => {
    const remaining = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    loadIntegrity();
    loadGrants();
    const interval = setInterval(() => {
      loadGrants();
      loadIntegrity();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Neural Consent System
            </h1>
            <p className="text-muted-foreground text-lg">
              Issue time-limited consent grants with 660ss standard expiry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Integrity Status */}
            <Card className={integrity?.threats ? "border-red-500" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Integrity
                </CardTitle>
                <CardDescription>Real-time neural stack health</CardDescription>
              </CardHeader>
              <CardContent>
                {integrity ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{integrity.consent_active}</div>
                      <div className="text-xs text-muted-foreground">Active Consents</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className={`text-2xl font-bold ${integrity.threats > 0 ? "text-red-500" : ""}`}>
                        {integrity.threats}
                      </div>
                      <div className="text-xs text-muted-foreground">Threats</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{integrity.signal_queue}</div>
                      <div className="text-xs text-muted-foreground">Signal Queue</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{integrity.disputes}</div>
                      <div className="text-xs text-muted-foreground">Disputes</div>
                    </div>
                    {integrity.fighter_mode !== "INACTIVE" && (
                      <div className="col-span-2">
                        <Badge variant="destructive" className="w-full justify-center py-2">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Fighter Mode: {integrity.fighter_mode}
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">Loading...</div>
                )}
              </CardContent>
            </Card>

            {/* Issue Consent */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Issue Consent
                </CardTitle>
                <CardDescription>Grant time-limited access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="grantee">Grantee ID</Label>
                  <Input
                    id="grantee"
                    placeholder="agent_id or user_id"
                    value={grantee}
                    onChange={(e) => setGrantee(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Consent Type</Label>
                  <Select value={consentType} onValueChange={setConsentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data_access">Data Access</SelectItem>
                      <SelectItem value="signal_share">Signal Sharing</SelectItem>
                      <SelectItem value="biometric">Biometric Auth</SelectItem>
                      <SelectItem value="delegate">Delegation</SelectItem>
                      <SelectItem value="emergency">Emergency Override</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Expiry Duration</Label>
                  <Select value={expiry} onValueChange={setExpiry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="660">11 min (standard 660ss)</SelectItem>
                      <SelectItem value="300">5 min (quick)</SelectItem>
                      <SelectItem value="3600">1 hour (extended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={issueConsent} 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  {isLoading ? "Issuing..." : "🚀 Issue Consent Grant"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Grants */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Active Grants
                  </CardTitle>
                  <CardDescription>Auto-expires at 660ss</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={loadGrants}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {grants.length > 0 ? (
                <div className="space-y-3">
                  {grants.map((grant) => (
                    <div
                      key={grant.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{grant.consent_type}</div>
                        <div className="text-sm text-muted-foreground">→ {grant.grantee_id}</div>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {getCountdown(grant.expires_at)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No active grants
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsentIssuer;
