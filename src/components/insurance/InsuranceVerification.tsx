
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface InsuranceVerificationProps {
  patientId?: string;
}

// Mock insurance verification API response
interface InsuranceVerificationResult {
  status: 'active' | 'inactive' | 'pending' | 'error';
  policyNumber: string;
  memberName: string;
  provider: string;
  planType: string;
  network: 'in-network' | 'out-of-network';
  coverage: {
    primaryCare: {
      copay: number;
      coinsurance: number;
    };
    specialist: {
      copay: number;
      coinsurance: number;
    };
    emergency: {
      copay: number;
      coinsurance: number;
    };
    deductible: {
      individual: number;
      family: number;
      remaining: number;
    };
    outOfPocket: {
      individual: number;
      family: number;
      remaining: number;
    };
  };
  eligibilityDate: string;
  errorDetails?: string;
}

const mockVerifyInsurance = async (
  policyNumber: string,
  dob: string,
  provider: string
): Promise<InsuranceVerificationResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response for specific inputs
  if (policyNumber === '12345678' && dob === '1980-01-01') {
    return {
      status: 'active',
      policyNumber: '12345678',
      memberName: 'John Smith',
      provider: 'Blue Cross Blue Shield',
      planType: 'PPO',
      network: 'in-network',
      coverage: {
        primaryCare: {
          copay: 20,
          coinsurance: 0,
        },
        specialist: {
          copay: 40,
          coinsurance: 10,
        },
        emergency: {
          copay: 150,
          coinsurance: 0,
        },
        deductible: {
          individual: 1500,
          family: 3000,
          remaining: 750,
        },
        outOfPocket: {
          individual: 5000,
          family: 10000,
          remaining: 3500,
        },
      },
      eligibilityDate: new Date().toISOString(),
    };
  } else if (policyNumber === '87654321') {
    return {
      status: 'inactive',
      policyNumber: '87654321',
      memberName: 'Jane Doe',
      provider: 'Aetna',
      planType: 'HMO',
      network: 'out-of-network',
      coverage: {
        primaryCare: {
          copay: 30,
          coinsurance: 20,
        },
        specialist: {
          copay: 50,
          coinsurance: 20,
        },
        emergency: {
          copay: 250,
          coinsurance: 10,
        },
        deductible: {
          individual: 2000,
          family: 4000,
          remaining: 2000,
        },
        outOfPocket: {
          individual: 6000,
          family: 12000,
          remaining: 6000,
        },
      },
      eligibilityDate: new Date().toISOString(),
      errorDetails: 'Policy inactive as of 2023-01-01',
    };
  } else {
    // Mock error response for any other input
    return {
      status: 'error',
      policyNumber: policyNumber,
      memberName: '',
      provider: provider,
      planType: '',
      network: 'out-of-network',
      coverage: {
        primaryCare: {
          copay: 0,
          coinsurance: 0,
        },
        specialist: {
          copay: 0,
          coinsurance: 0,
        },
        emergency: {
          copay: 0,
          coinsurance: 0,
        },
        deductible: {
          individual: 0,
          family: 0,
          remaining: 0,
        },
        outOfPocket: {
          individual: 0,
          family: 0,
          remaining: 0,
        },
      },
      eligibilityDate: new Date().toISOString(),
      errorDetails: 'Unable to verify insurance information. Please check the policy number and try again.',
    };
  }
};

const InsuranceVerification: React.FC<InsuranceVerificationProps> = ({ patientId }) => {
  const { toast } = useToast();
  const [policyNumber, setPolicyNumber] = useState('');
  const [dob, setDob] = useState('');
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InsuranceVerificationResult | null>(null);

  const handleVerifyInsurance = async () => {
    if (!policyNumber || !dob || !provider) {
      toast({
        title: 'Missing Information',
        description: 'Please provide all required information to verify insurance.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const verificationResult = await mockVerifyInsurance(policyNumber, dob, provider);
      setResult(verificationResult);

      toast({
        title: `Insurance Verification ${verificationResult.status === 'active' ? 'Successful' : 'Alert'}`,
        description: verificationResult.status === 'active' 
          ? `${verificationResult.memberName}'s insurance is active.` 
          : verificationResult.errorDetails || 'Unable to verify insurance.',
        variant: verificationResult.status === 'active' ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'An error occurred while verifying the insurance information.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'pending':
        return <ArrowRight className="w-6 h-6 text-amber-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Insurance Verification
        </CardTitle>
        <CardDescription>
          Verify patient insurance eligibility and coverage details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                placeholder="Enter policy number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider">Insurance Provider</Label>
            <Input
              id="provider"
              placeholder="Enter provider name"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleVerifyInsurance} 
            disabled={loading}
            className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
          >
            {loading ? 'Verifying...' : 'Verify Insurance'}
            {!loading && <Search className="ml-2 h-4 w-4" />}
          </Button>
          
          <div className="text-xs text-muted-foreground mt-2">
            <p>Hint: For demo purposes, try policy number "12345678" with DOB "1980-01-01" for active insurance.</p>
            <p>Or try "87654321" for inactive insurance.</p>
          </div>
        </div>

        {result && (
          <div className="mt-6 border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Verification Results</h3>
              <div className="flex items-center">
                <span className="mr-2">Status:</span>
                <div className="flex items-center">
                  {getStatusIcon(result.status)}
                  <span className="ml-1 capitalize">{result.status}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium">Member</p>
                <p className="text-sm">{result.memberName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Provider</p>
                <p className="text-sm">{result.provider}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Plan Type</p>
                <p className="text-sm">{result.planType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Network Status</p>
                <p className={`text-sm ${result.network === 'in-network' ? 'text-green-600' : 'text-red-600'}`}>
                  {result.network === 'in-network' ? 'In-Network' : 'Out-of-Network'}
                </p>
              </div>
            </div>
            
            {result.status === 'active' && (
              <>
                <Separator className="my-4" />
                
                <h4 className="text-md font-medium mb-2">Coverage Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="border rounded p-3">
                    <p className="text-sm font-medium">Primary Care</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">Copay</span>
                      <span className="text-xs font-medium">${result.coverage.primaryCare.copay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Coinsurance</span>
                      <span className="text-xs font-medium">{result.coverage.primaryCare.coinsurance}%</span>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <p className="text-sm font-medium">Specialist</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">Copay</span>
                      <span className="text-xs font-medium">${result.coverage.specialist.copay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Coinsurance</span>
                      <span className="text-xs font-medium">{result.coverage.specialist.coinsurance}%</span>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <p className="text-sm font-medium">Emergency</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">Copay</span>
                      <span className="text-xs font-medium">${result.coverage.emergency.copay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Coinsurance</span>
                      <span className="text-xs font-medium">{result.coverage.emergency.coinsurance}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-3">
                    <p className="text-sm font-medium">Deductible</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">Individual</span>
                      <span className="text-xs font-medium">${result.coverage.deductible.individual}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Family</span>
                      <span className="text-xs font-medium">${result.coverage.deductible.family}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Remaining</span>
                      <span className="text-xs font-medium">${result.coverage.deductible.remaining}</span>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <p className="text-sm font-medium">Out-of-Pocket Max</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">Individual</span>
                      <span className="text-xs font-medium">${result.coverage.outOfPocket.individual}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Family</span>
                      <span className="text-xs font-medium">${result.coverage.outOfPocket.family}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Remaining</span>
                      <span className="text-xs font-medium">${result.coverage.outOfPocket.remaining}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {result.errorDetails && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">{result.errorDetails}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-xs text-muted-foreground">
          Verification as of: {result?.eligibilityDate ? new Date(result.eligibilityDate).toLocaleString() : 'N/A'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default InsuranceVerification;
