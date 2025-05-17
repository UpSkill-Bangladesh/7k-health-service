
import React, { useState } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  amount: number;
  description?: string;
  onPaymentComplete?: (success: boolean, transactionId?: string) => void;
}

const PaymentProcessor: React.FC<PaymentFormProps> = ({
  amount,
  description = "Payment for services",
  onPaymentComplete
}) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Mock function to process payment
  const processPayment = async () => {
    // In a real app, this would integrate with Stripe or other payment processor
    
    // Reset any previous errors
    setPaymentError(null);
    setLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simple validation for demo purposes
    if (cardNumber === "4111111111111111" && cvc && expDate && nameOnCard) {
      setPaymentComplete(true);
      setLoading(false);
      
      // Generate a mock transaction ID
      const transactionId = `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      toast({
        title: "Payment Successful",
        description: `Your payment of $${amount.toFixed(2)} has been processed. Transaction ID: ${transactionId}`,
      });
      
      if (onPaymentComplete) {
        onPaymentComplete(true, transactionId);
      }
      
      return;
    }
    
    // Simulate error
    setLoading(false);
    setPaymentError("Payment failed. Please check your card information and try again.");
    
    toast({
      title: "Payment Failed",
      description: "Your payment could not be processed. Please check your card details.",
      variant: "destructive",
    });
    
    if (onPaymentComplete) {
      onPaymentComplete(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiration date as MM/YY
  const formatExpDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  if (paymentComplete) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Payment Successful</h3>
            <p className="text-gray-500 mb-4">
              Your payment of ${amount.toFixed(2)} has been processed successfully.
            </p>
            <Button 
              onClick={() => setPaymentComplete(false)}
              variant="outline"
            >
              Make Another Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Information
        </CardTitle>
        <CardDescription>
          Enter your payment details to complete your transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md p-3 bg-muted/50">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Amount Due</span>
              <span className="text-sm font-bold">${amount.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground">{description}</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              placeholder="John Doe"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4111 1111 1111 1111"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              disabled={loading}
            />
            <div className="text-xs text-muted-foreground">
              For demo purposes, use card number 4111 1111 1111 1111
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expDate">Expiration Date</Label>
              <Input
                id="expDate"
                placeholder="MM/YY"
                value={expDate}
                onChange={(e) => setExpDate(formatExpDate(e.target.value))}
                maxLength={5}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                disabled={loading}
              />
            </div>
          </div>
          
          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{paymentError}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
          onClick={processPayment}
          disabled={!cardNumber || !expDate || !cvc || !nameOnCard || loading}
        >
          {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentProcessor;
