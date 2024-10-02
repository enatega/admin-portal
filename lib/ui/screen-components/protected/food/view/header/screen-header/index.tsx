// Interface and Types

// Components
import { FoodsContext } from '@/lib/context/foods.context';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

const FoodHeader = () => {
  // Context
  const { onFoodFormVisible } = useContext(FoodsContext);

  return (
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
        <HeaderText text="Foods" />
        <TextIconClickable
          className="rounded border-gray-300 bg-black text-white sm:w-auto"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Food"
          onClick={() => onFoodFormVisible(true)}
        />
      </div>
    </div>
  );
};

export default FoodHeader;
