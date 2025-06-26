import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';

// shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { Star, Clock, ShoppingCart } from 'lucide-react';

// Mock Data based on User Journey
const restaurantData = {
  name: 'Sushi Express',
  description: 'The freshest and most delicious sushi, delivered fast to your door. Perfect for a quick and satisfying meal.',
  rating: 4.8,
  deliveryTime: '20-30 min',
  imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop',
  tags: ['Sushi', 'Japanese', 'Fast Delivery'],
};

const menuData = {
  appetizers: [
    {
      id: 'app1',
      name: 'Miso Soup',
      description: 'A traditional Japanese soup with tofu, seaweed, and scallions.',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1623428187969-5da2d257e753?q=80&w=1470&auto=format&fit=crop',
    },
    {
      id: 'app2',
      name: 'Edamame',
      description: 'Steamed young soybeans sprinkled with sea salt.',
      price: 5.00,
      imageUrl: 'https://images.unsplash.com/photo-1596464229569-34f3a74b8a2c?q=80&w=1325&auto=format&fit=crop',
    },
  ],
  sushiRolls: [
    {
      id: 'roll1',
      name: 'Spicy Tuna Roll',
      description: 'A classic roll with spicy tuna, cucumber, and avocado.',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1611141653457-c3975d5e7587?q=80&w=1470&auto=format&fit=crop',
    },
    {
      id: 'roll2',
      name: 'California Roll',
      description: 'Crab meat, avocado, and cucumber wrapped in seaweed and rice.',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1364&auto=format&fit=crop',
    },
    {
      id: 'roll3',
      name: 'Dragon Roll',
      description: 'Eel and cucumber topped with thinly sliced avocado.',
      price: 12.50,
      imageUrl: 'https://images.unsplash.com/photo-1607301405390-7c614deb273b?q=80&w=1470&auto=format&fit=crop',
    },
  ],
};

const RestaurantMenuPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  console.log('RestaurantMenuPage loaded');

  const handleAddToCart = (itemId: string | number) => {
    const item = [...menuData.appetizers, ...menuData.sushiRolls].find(i => i.id === itemId);
    if (item) {
      setCart(prevCart => [...prevCart, item]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Restaurant Info Header */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1528&auto=format&fit=crop"
                alt="Restaurant interior"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={restaurantData.imageUrl} alt={restaurantData.name} />
                  <AvatarFallback>{restaurantData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-16 p-6">
              <h1 className="text-3xl font-bold tracking-tight">{restaurantData.name}</h1>
              <p className="text-muted-foreground mt-2">{restaurantData.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-foreground">{restaurantData.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurantData.deliveryTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {restaurantData.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Menu Sections */}
          <div className="lg:col-span-8 space-y-8">
            <section id="appetizers">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Appetizers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuData.appetizers.map(item => (
                  <MenuItemCard key={item.id} {...item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </section>

            <section id="sushi-rolls">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Sushi Rolls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuData.sushiRolls.map(item => (
                  <MenuItemCard key={item.id} {...item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </section>
          </div>

          {/* Cart Summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-muted-foreground">{cart.length} item(s) in your cart.</p>
                      <ul className="text-sm list-disc pl-5">
                        {cart.map((item, index) => <li key={index}>{item.name}</li>)}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Your cart is empty. Add items from the menu to get started!</p>
                  )}
                  <Button asChild className="w-full mt-6" disabled={cart.length === 0}>
                    <Link to="/checkout">Go to Checkout</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;