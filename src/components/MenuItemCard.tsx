import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const { toast } = useToast();
  console.log('MenuItemCard loaded for:', name);

  const handleAddToCartClick = () => {
    onAddToCart(id);
    toast({
      title: "Item Added!",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row overflow-hidden transition-all duration-200 hover:shadow-lg">
      {imageUrl && (
        <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
          <AspectRatio ratio={1}>
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-col flex-grow p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="p-0 pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">${price.toFixed(2)}</span>
          <Button onClick={handleAddToCartClick} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemCard;