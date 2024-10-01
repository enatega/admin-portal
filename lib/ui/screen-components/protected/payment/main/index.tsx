import React, { useState, useContext, useEffect } from 'react';
import PaymentCard from '@/lib/ui/useable-components/PaymentCard';
import PaymentCardSkeleton from '@/lib/ui/useable-components/custom-skeletons/payment.card.skeleton';
import { useConfiguration } from '@/lib/hooks/useConfiguration';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { IPaymentMethod } from '@/lib/utils/interfaces/payment.card.interface';

export default function PaymentMain() {
  const { SERVER_URL } = useConfiguration();
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const { restaurantId } = restaurantLayoutContextData;

  const [initialLoading, setInitialLoading] = useState(true);
  const [submittingMethod, setSubmittingMethod] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

  const handleStripeSubmit = async () => {
    setSubmittingMethod('stripe');
    try {
      const response = await fetch(`${SERVER_URL}stripe/account`, {
        method: 'POST',
        body: JSON.stringify({ restaurantId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmittingMethod(null);
    }
  };

  const fetchPaymentMethods = () => {
    // Simulating a fetch call to load payment methods
    setTimeout(() => {
      setPaymentMethods([
        {
          id: 'stripe',
          name: 'Stripe',
          description: 'Connect with Stripe for payments.',
          icon: faCreditCard,
          type: 'stripe',
          onClick: handleStripeSubmit,
        },
      ]);
      setInitialLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const renderPaymentMethods = () => {
    if (initialLoading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <PaymentCardSkeleton key={i} />
      ));
    }

    return paymentMethods.map((method) => (
      <PaymentCard
        key={method.id}
        name={method.name}
        description={method.description}
        onClick={method.onClick}
        loading={submittingMethod === method.id}
        icon={method.icon}
        type={method.type}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full rounded-lg border border-gray-200 p-8 md:p-16">
        <div
          className={`grid gap-6 pb-16 ${
            paymentMethods.length === 1
              ? 'grid-cols-1 place-items-center'
              : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {renderPaymentMethods()}
        </div>
      </div>
    </div>
  );
}
