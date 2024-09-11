'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FoodManagementPage() {
  // Hooks
  const router = useRouter();

  // Effects
  useEffect(() => {
    router.push('/admin/restaurant/food-management/food');
  }, []);

  return <></>;
}
