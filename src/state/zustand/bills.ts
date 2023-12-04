import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { caclulatePeriod } from '../../components/bills/bill_utils'
import { BillsPeriod } from '../../components/bills/PeriodPicker'

interface BillsState {
    period:BillsPeriod
    updatePeriod: (period:BillsPeriod) => void
    one_shop_query_key:any[]
    updateOneShopQueryKey: (key:any[]) => void
    checked:boolean
    setChecked: (checked:boolean) => void
}

export const useBillsStore = create<BillsState>()(
    devtools(
        persist(
            (set) => ({
          
                period: caclulatePeriod(new Date().getMonth() + 1, new Date().getFullYear()),
                updatePeriod: (period) => set((state) => ({period})),
                one_shop_query_key: ['shops'],
                updateOneShopQueryKey: (key) => set((state) => ({one_shop_query_key: key})),
                checked: false,
                setChecked: (checked) => set((state) => ({checked})),
            }),
            {
                name: 'bills-storage',
            }
        )
    )
)
