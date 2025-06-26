import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReceiptText, ChefHat, Truck, PackageCheck, Check } from 'lucide-react';

// Define the possible statuses for type safety
type OrderStatus = 'Order Placed' | 'Preparing' | 'On its way' | 'Delivered';

// Define the props interface for the component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
  orderId?: string;
}

// Define the steps with their names and corresponding icons
const steps = [
  { name: 'Order Placed', icon: ReceiptText },
  { name: 'Preparing', icon: ChefHat },
  { name: 'On its way', icon: Truck },
  { name: 'Delivered', icon: PackageCheck },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, orderId = "FF-12345" }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStepIndex = steps.findIndex(step => step.name === currentStatus);

  // Calculate the width of the progress bar
  // The progress is based on the gaps between steps, not the steps themselves.
  const progressPercentage = currentStepIndex > 0 
    ? (currentStepIndex / (steps.length - 1)) * 100 
    : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Track Your Order</CardTitle>
        <CardDescription>
          Order #{orderId} is currently: <span className="font-semibold text-primary">{currentStatus}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8 px-4 sm:px-8">
        <div className="relative">
          {/* Background line */}
          <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 rounded-full" />
          
          {/* Progress line */}
          <div 
            className="absolute left-0 top-5 h-1 bg-primary rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between items-start">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.name} className="flex flex-col items-center text-center w-24">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                      isCompleted || isCurrent ? "bg-primary border-primary" : "bg-white border-gray-300",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <step.icon
                        className={cn(
                          "w-5 h-5",
                          isCurrent ? "text-white" : "text-gray-400"
                        )}
                      />
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm font-medium",
                      isCompleted || isCurrent ? "text-primary" : "text-gray-500"
                    )}
                  >
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;