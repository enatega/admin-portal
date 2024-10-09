// Core
import { useContext, useEffect } from 'react';

// Context
import { LayoutContext } from '@/lib/context/global/layout.context';

// Interface & Types
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';

// Icons
import {
  faArrowLeft,
  faCog,
  faHome,
  faSliders,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// Components
import SidebarItem from './side-bar-item';
import { useUserContext } from '@/lib/hooks/useUser';

function AdminSidebar({ children }: IGlobalComponentProps) {
  // Context
  const { isRestaurantSidebarVisible, showRestaurantSidebar } =
    useContext<LayoutContextProps>(LayoutContext);

  // Detect clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('app-sidebar');
      const iconContainer = document.getElementById('sidebar-opening-icon'); // Assuming this is the ID of the icon container
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        iconContainer &&
        !iconContainer.contains(event.target as Node)
      ) {
        showRestaurantSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRestaurantSidebar]);

  return (
    <div className="relative">
      <aside
        id="app-sidebar"
        className={`box-border transform overflow-hidden transition-all duration-300 ease-in-out ${isRestaurantSidebarVisible ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'}`}
      >
        <nav
          className={`flex h-full flex-col border-r bg-white shadow-sm transition-opacity duration-300 ${isRestaurantSidebarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <ul className="flex-1 pl-2">{children}</ul>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar() {
  const { isRestaurantSidebarVisible } =
    useContext<LayoutContextProps>(LayoutContext);
  const { user } = useUserContext();

  const navBarItems: ISidebarMenuItem[] = [
    {
      text: 'Dashboard',
      route: '/admin/restaurant/dashboard',
      isParent: true,
      icon: faHome,
      isClickable: true,
    },
    {
      text: 'Profile',
      route: '/admin/restaurant/profile',
      isParent: true,
      icon: faUser,
      isClickable: true,
    },
    {
      text: 'Food Management',
      route: '/admin/restaurant/food-management',
      isParent: true,
      icon: faCog,
      subMenu: [
        {
          text: 'Food',
          route: '/admin/restaurant/food-management/food',
          isParent: false,
        },
        {
          text: 'Category',
          route: '/admin/restaurant/food-management/category',
          isParent: false,
        },
        {
          text: 'Options',
          route: '/admin/restaurant/food-management/options',
          isParent: false,
        },
        {
          text: 'Addons',
          route: '/admin/restaurant/food-management/add-ons',
          isParent: false,
        },
        {
          text: 'Orders',
          route: '/admin/restaurant/food-management/orders',
          isParent: false,
        },
      ],
    },
    {
      text: 'General',
      route: '/admin/restaurant/general',
      isParent: true,
      icon: faSliders,
      subMenu: [
        {
          text: 'Timing',
          route: '/admin/restaurant/general/timing',
          isParent: false,
        },
        {
          text: 'Coupons',
          route: '/admin/restaurant/general/coupons',
          isParent: false,
        },
        {
          text: 'Payments',
          route: '/admin/restaurant/general/payments',
          isParent: false,
        },
        {
          text: 'Ratings',
          route: '/admin/restaurant/general/ratings',
          isParent: false,
        },
      ],
    },

    {
      text: user?.userType === 'ADMIN' ? 'Back to Admin' : 'Back to Vendor',
      route: user?.userType === 'ADMIN' ? '/home' : '/admin/vendor/dashboard', // If super admin redirect to /home, if vendor redirecot to /admin/vendor/restaurants
      isParent: true,
      icon: faArrowLeft,
      isClickable: true,
      isLastItem: true,
      shouldShow: () => {
        return !(user?.userType === 'RESTAURANT');
      },
    },
  ];

  return (
    <>
      <AdminSidebar>
        <div className="h-[92vh] overflow-y-auto overflow-x-hidden pr-2">
          {navBarItems.map((item, index) =>
            item.shouldShow && !item.shouldShow() ? null : (
              <SidebarItem
                key={index}
                expanded={isRestaurantSidebarVisible}
                {...item}
              />
            )
          )}
        </div>
      </AdminSidebar>
    </>
  );
}
