import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Truck, Landmark } from 'lucide-react';

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handlePlaceOrder = () => {
    // In a real app, you would process the payment and order here.
    // On success, navigate to the tracking page.
    console.log('Placing order...');
    navigate('/order-tracking'); // Navigate to the path from App.tsx
  };

  // Placeholder data based on user journey
  const orderItems = [
    { id: 1, name: 'Spicy Tuna Roll', price: 12.99, quantity: 1 },
    { id: 2, name: 'Miso Soup', price: 3.50, quantity: 1 },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Delivery and Payment */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" defaultValue="123 Office Park" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" defaultValue="Metropolis" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" defaultValue="10001" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="delivery-instructions">Delivery Instructions (optional)</Label>
                    <Input id="delivery-instructions" placeholder="Leave at front desk" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" /> Payment Method</CardTitle>
                  <CardDescription>Please select your preferred payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <Label htmlFor="credit-card" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <CreditCard className="h-6 w-6" />
                      <span>Credit / Debit Card</span>
                    </Label>
                    {paymentMethod === 'credit-card' && (
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-12 pt-2">
                         <div className="md:col-span-4 space-y-2">
                           <Label htmlFor="card-number">Card Number</Label>
                           <Input id="card-number" placeholder="•••• •••• •••• 1234" />
                         </div>
                         <div className="md:col-span-2 space-y-2">
                           <Label htmlFor="expiry">Expiry Date</Label>
                           <Input id="expiry" placeholder="MM/YY" />
                         </div>
                         <div className="md:col-span-2 space-y-2">
                           <Label htmlFor="cvc">CVC</Label>
                           <Input id="cvc" placeholder="123" />
                         </div>
                       </div>
                    )}
                    <Label htmlFor="paypal" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.png" alt="PayPal" className="h-6" />
                        <span>PayPal</span>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;