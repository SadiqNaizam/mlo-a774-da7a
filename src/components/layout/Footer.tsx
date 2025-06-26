import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">FeastFlow</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                    <Link
                        key={link.label}
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="mt-8 pt-8 border-t flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
                &copy; {currentYear} FeastFlow. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;