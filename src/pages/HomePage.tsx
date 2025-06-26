import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CuisineCategoryFilter from '@/components/CuisineCategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Icons
import { Search } from 'lucide-react';

// Placeholder data for restaurants
const sampleRestaurants = [
  {
    id: 1,
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&h=450&fit=crop',
    cuisine: 'Sushi',
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    id: 2,
    slug: 'pizza-palace',
    name: 'Pizza Palace',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&h=450&fit=crop',
    cuisine: 'Pizza',
    rating: 4.5,
    deliveryTime: 30,
  },
  {
    id: 3,
    slug: 'curry-corner',
    name: 'Curry Corner',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&h=450&fit=crop',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: 35,
  },
  {
    id: 4,
    slug: 'burger-barn',
    name: 'Burger Barn',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&h=450&fit=crop',
    cuisine: 'Burgers',
    rating: 4.3,
    deliveryTime: 20,
  },
  {
    id: 5,
    slug: 'salad-station',
    name: 'Salad Station',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&h=450&fit=crop',
    cuisine: 'Salads',
    rating: 4.9,
    deliveryTime: 15,
  },
  {
    id: 6,
    slug: 'the-sandwich-shop',
    name: 'The Sandwich Shop',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c766?q=80&w=800&h=450&fit=crop',
    cuisine: 'Sandwiches',
    rating: 4.6,
    deliveryTime: 25,
  },
];


const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    // Navigate to the restaurant listing page with the selected cuisine as a query parameter
    navigate(`/restaurant-listing?cuisine=${slug}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-cover bg-center text-white flex flex-col justify-center items-center text-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Your next meal, delivered
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover local favorites and get them delivered to your door.
            </p>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <Input
                type="search"
                placeholder="Find a restaurant or a dish..."
                className="flex-1 text-black"
                aria-label="Search for restaurants"
              />
              <Button type="submit" size="lg" aria-label="Search">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </div>
          </div>
        </section>

        <div className="container py-12 space-y-16">
          {/* Cuisine Categories Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Or browse by cuisine</h2>
            <CuisineCategoryFilter onSelectCategory={handleSelectCategory} activeCategory={activeCategory} />
          </section>

          {/* Popular Near You Carousel Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Popular Near You</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {sampleRestaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <RestaurantCard {...restaurant} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>

          {/* All Restaurants Grid Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">All Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sampleRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;