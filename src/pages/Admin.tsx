import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Download, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface TrialSignup {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  ai_use_case: string | null;
  created_at: string;
}

const Admin = () => {
  const [signups, setSignups] = useState<TrialSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please sign in to continue.",
          variant: "destructive",
        });
        navigate('/sign-in');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      fetchSignups();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    }
  };

  const fetchSignups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('free_trial_signups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSignups(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch signups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signup?')) return;

    try {
      const { error } = await supabase
        .from('free_trial_signups')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signup deleted successfully",
      });

      fetchSignups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete signup",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Company', 'AI Use Case', 'Created At'];
    const rows = signups.map(s => [
      s.first_name,
      s.last_name,
      s.email,
      s.company || '',
      s.ai_use_case || '',
      format(new Date(s.created_at), 'yyyy-MM-dd HH:mm:ss')
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trial-signups-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "CSV file has been downloaded",
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Checking permissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl">Trial Signups Dashboard</CardTitle>
                  <CardDescription className="mt-2">
                    Manage and view all free trial signups
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={fetchSignups} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button onClick={exportToCSV} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 rounded-lg p-4 border border-indigo-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Total Signups</p>
                  <p className="text-3xl font-bold">{signups.length}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-lg p-4 border border-emerald-500/20">
                  <p className="text-sm text-muted-foreground mb-1">This Week</p>
                  <p className="text-3xl font-bold">
                    {signups.filter(s => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(s.created_at) > weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Today</p>
                  <p className="text-3xl font-bold">
                    {signups.filter(s => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return new Date(s.created_at) >= today;
                    }).length}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading signups...</p>
                </div>
              ) : signups.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No signups yet</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Use Case</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signups.map((signup) => (
                        <TableRow key={signup.id}>
                          <TableCell className="font-medium">
                            {signup.first_name} {signup.last_name}
                          </TableCell>
                          <TableCell>{signup.email}</TableCell>
                          <TableCell>
                            {signup.company ? (
                              <Badge variant="secondary">{signup.company}</Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {signup.ai_use_case ? (
                              <Badge variant="outline">{signup.ai_use_case}</Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(signup.created_at), 'MMM dd, yyyy HH:mm')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(signup.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

export default Admin;
