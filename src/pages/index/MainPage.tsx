import React from 'react';
import { BillsView } from '../../components/bills/BillsView';
import { useBillsPeriod } from '../../components/bills/bill_utils';
import { AppUser } from '../../state/types/base';

interface WelcomePageProps {
  user:AppUser
}

export default function MainPage({ user }: WelcomePageProps){
const {period,setPeriod}=useBillsPeriod()
return (
    <div className="w-full h-full flex flex-col justify-start items center dark:bg-yellow-900">
        <BillsView period={period} setPeriod={setPeriod}/>
    </div>
  );
};
