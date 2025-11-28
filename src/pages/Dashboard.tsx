import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, CreditCard, Settings, LogOut, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Profile {
  full_name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
}

interface Subscription {
  id: string;
  plan_name: string;
  status: string;
  amount_cents: number;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUserEmail(session.user.email || null);

      // Load profile and subscriptions in parallel
      const [profileResult, subscriptionsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('full_name, email, company, phone')
          .eq('user_id', session.user.id)
          .single(),
        supabase
          .from('subscriptions')
          .select('id, plan_name, status, amount_cents, created_at')
          .eq('user_email', session.user.email)
          .order('created_at', { ascending: false })
      ]);

      if (profileResult.data) {
        setProfile(profileResult.data);
      }

      if (subscriptionsResult.data) {
        setSubscriptions(subscriptionsResult.data);
      }

      setLoading(false);
    };

    checkAuthAndLoadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'canceled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'past_due':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {profile?.full_name || userEmail}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <p className="text-foreground">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <p className="text-foreground">{userEmail}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Company</span>
                  <p className="text-foreground">{profile?.company || 'Not set'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <p className="text-foreground">{profile?.phone || 'Not set'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Active Subscription Card */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Current Plan</CardTitle>
                  <CardDescription>Your active subscription</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {subscriptions.find(s => s.status === 'active') ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-foreground">
                      {subscriptions.find(s => s.status === 'active')?.plan_name}
                    </p>
                    <Badge className={getStatusColor('active')}>Active</Badge>
                    <p className="text-muted-foreground">
                      ${(subscriptions.find(s => s.status === 'active')?.amount_cents || 0) / 100}/month
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">No active subscription</p>
                    <Button onClick={() => navigate('/get-started')} size="sm">
                      Choose a Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/get-started')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/contact')}>
                  <User className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Subscription History */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription History</CardTitle>
              <CardDescription>All your subscription records</CardDescription>
            </CardHeader>
            <CardContent>
              {subscriptions.length > 0 ? (
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-2"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-foreground">{sub.plan_name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${sub.amount_cents / 100}/month
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </span>
                        <Badge className={getStatusColor(sub.status)}>
                          {sub.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No subscriptions yet. <a href="/get-started" className="text-primary hover:underline">Get started</a> with a plan.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
