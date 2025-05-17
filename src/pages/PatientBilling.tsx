
import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InsuranceVerification from "@/components/insurance/InsuranceVerification";
import PaymentProcessor from "@/components/payment/PaymentProcessor";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockOutstandingBalances = [
  { id: "1", date: "2023-04-15", service: "Annual Physical", billed: 250, insurance: 200, patient: 50 },
  { id: "2", date: "2023-04-22", service: "Lab Work", billed: 180, insurance: 144, patient: 36 },
  { id: "3", date: "2023-05-10", service: "Specialist Consultation", billed: 350, insurance: 245, patient: 105 },
];

const PatientBilling: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalDue = mockOutstandingBalances.reduce((sum, item) => sum + item.patient, 0);

  const handlePayNowClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      // In a real app, update the billing information in the database
      setShowPaymentForm(false);
    }
  };

  const getPaymentAmount = () => {
    if (selectedService === "total") {
      return totalDue;
    } else if (selectedService === "custom") {
      return parseFloat(customAmount) || 0;
    } else {
      const service = mockOutstandingBalances.find(item => item.id === selectedService);
      return service ? service.patient : 0;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-healthcare-primary mb-6">Patient Billing & Insurance</h1>
        
        <Tabs defaultValue="billing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="billing" className="space-y-6">
            {!showPaymentForm ? (
              <>
                {/* Outstanding Balance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Outstanding Balance</CardTitle>
                    <CardDescription>Review and make payments on your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockOutstandingBalances.length > 0 ? (
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Service</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Billed</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Insurance</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Patient Resp.</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockOutstandingBalances.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 px-4">{item.date}</td>
                                  <td className="py-3 px-4">{item.service}</td>
                                  <td className="py-3 px-4">${item.billed.toFixed(2)}</td>
                                  <td className="py-3 px-4">${item.insurance.toFixed(2)}</td>
                                  <td className="py-3 px-4 font-medium">${item.patient.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="bg-gray-50">
                                <td className="py-3 px-4 font-medium" colSpan={4}>Total Due</td>
                                <td className="py-3 px-4 font-bold text-healthcare-primary">${totalDue.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        
                        {/* Payment Options */}
                        <div className="mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="paymentOption">Payment Options</Label>
                              <Select onValueChange={setSelectedService}>
                                <SelectTrigger id="paymentOption">
                                  <SelectValue placeholder="Select payment option" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="total">Pay Full Balance (${totalDue.toFixed(2)})</SelectItem>
                                  {mockOutstandingBalances.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                      Pay for {item.service} (${item.patient.toFixed(2)})
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="custom">Custom Amount</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {selectedService === "custom" && (
                              <div className="space-y-2">
                                <Label htmlFor="customAmount">Custom Amount</Label>
                                <Input
                                  id="customAmount"
                                  type="number"
                                  placeholder="Enter amount"
                                  value={customAmount}
                                  onChange={(e) => setCustomAmount(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            className="mt-4 bg-healthcare-primary hover:bg-healthcare-accent"
                            disabled={!selectedService || (selectedService === "custom" && !customAmount)}
                            onClick={handlePayNowClick}
                          >
                            Proceed to Payment
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-lg">No outstanding balances at this time.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Make a Payment</CardTitle>
                  <CardDescription>
                    Pay your outstanding balance securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentProcessor 
                    amount={getPaymentAmount()} 
                    description="Healthcare services payment" 
                    onPaymentComplete={handlePaymentComplete}
                  />
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full" 
                    onClick={() => setShowPaymentForm(false)}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="insurance">
            <InsuranceVerification />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientBilling;
