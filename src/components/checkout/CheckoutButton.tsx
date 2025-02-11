import React from 'react';
import { DollarSign, Loader } from 'lucide-react';
import { useCreateCheckout } from '../../hooks/useCheckout';

interface CheckoutButtonProps {
  productId: string;
  email: string;
  customFields?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({
  productId,
  email,
  customFields,
  children,
  className = ''
}: CheckoutButtonProps) {
  const checkout = useCreateCheckout();

  const handleCheckout = async () => {
    try {
      const result = await checkout.mutateAsync({
        productId,
        email,
        customFields
      });

      // Redirect to Sellix checkout
      window.location.href = result.url;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={checkout.isPending}
      className={`premium-button flex items-center justify-center ${
        checkout.isPending ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {checkout.isPending ? (
        <>
          <Loader className="h-5 w-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <DollarSign className="h-5 w-5 mr-2" />
          {children}
        </>
      )}
    </button>
  );
}