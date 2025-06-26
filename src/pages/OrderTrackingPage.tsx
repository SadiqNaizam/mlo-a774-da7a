import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Clock, Utensils } from 'lucide-react';

// Define the possible statuses for type safety, matching the OrderTracker component
type OrderStatus = 'Order Placed' | 'Preparing' | 'On its way' | 'Delivered';

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  const orderStatuses: OrderStatus[] = ['Order Placed', 'Preparing', 'On its way', 'Delivered'];
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Order Placed');

  useEffect(() => {
    const currentIndex = orderStatuses.indexOf(currentStatus);
    if (currentIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(orderStatuses[currentIndex + 1]);
      }, 3000); // Update status every 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [currentStatus]);

  const orderItems = [
    { name: 'Spicy Tuna Roll', quantity: 1, price: 12.99 },
    { name: 'Miso Soup', quantity: 1, price: 3.50 },
  ];
  
  const orderTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <OrderTracker currentStatus={currentStatus} orderId="FF-12345" />

          <Alert>
            <Utensils className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Your delivery person might contact you upon arrival. Please keep your phone nearby.
            </AlertDescription>
          </Alert>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold">Your Office Address</p>
                <p className="text-muted-foreground">123 Business Rd, Suite 456, Worktown, USA 12345</p>
                <div className="flex items-center gap-2 pt-2">
                    <Clock className="h-4 w-4 text-muted-foreground"/>
                    <span>Estimated Arrival: <strong>12:45 PM</strong></span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Total: ${orderTotal}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                    {orderItems.map(item => (
                        <li key={item.name} className="flex justify-between">
                            <span>{item.quantity} x {item.name}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;