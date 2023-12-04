import {
  SelectOption,
  SimpleSelect,
} from "@/components/form/react-select/SimpleSelect";
import { getPrevMonthandYear } from "@/utils/date-helpers";
import { period_month_options, period_year_options } from "../../utils/bill_options";

export interface BillsPeriod {
  curr_month: number;
  curr_year: number;
  prev_month: number;
  prev_year: number;
}
interface PeriodPickerProps {
  period: BillsPeriod;
  setPeriod: React.Dispatch<React.SetStateAction<BillsPeriod>>;
}



export function PeriodPicker({ period, setPeriod }: PeriodPickerProps) {
  //     const [checked, setChecked] = useState(bill_store.checked)

  // useEffect(() => {
  //     bill_store.setChecked(checked)
  // },[checked])

  const handleMonthChange = (e: SelectOption) => {
    if (e) {
      setPeriod((prev) => {
        return {
          ...prev,
          curr_month: parseFloat(e.value),
          prev_month: getPrevMonthandYear(parseFloat(e.value)).month,
          prev_year: getPrevMonthandYear(parseFloat(e.value)).year,
        };
      });

      setPeriod((prev) => {
        return { ...prev, curr_month: parseFloat(e.value) };
      });
    }
  };
  const handleYearChange = (e: SelectOption) => {
    if (e) {
      setPeriod((prev) => {
        return { ...prev, curr_year: parseFloat(e.value) };
      });
    }
  };
  const handlePrevMonthChange = (e: SelectOption) => {
    if (e) {
      setPeriod((prev) => {
        return { ...prev, prev_month: parseFloat(e.value) };
      });
    }
  };
  const handlePrevYearChange = (e: SelectOption) => {
    if (e) {
      setPeriod((prev) => {
        return { ...prev, prev_year: parseFloat(e.value) };
      });
    }
  };

  return (
    <div className="w-full   flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-wrap items-center justify-center gap-1">


        <div className="min-w-[30%] flex justify-center items-center">
          <h3>CURR</h3>
          <SimpleSelect
            label="month-select"
            select_options={period_month_options}
            defaultValue={{
              value: period.curr_month.toString(),
              label: period.curr_month.toString(),
            }}
            handleSelectChange={handleMonthChange}
          />

          <SimpleSelect
            label="year-select"
            select_options={period_year_options}
            defaultValue={{
              value: period.curr_year.toString(),
              label: period.curr_year.toString(),
            }}
            handleSelectChange={handleYearChange}
          />
        </div>

        <div className="min-w-[30%] flex justify-center items-center">
          <h3>PREV</h3>
          <SimpleSelect
            label="prev-month-select"
            select_options={period_month_options}
            defaultValue={{
              value: period.prev_month.toString(),
              label: period.prev_month.toString(),
            }}
            handleSelectChange={handlePrevMonthChange}
          />

          <SimpleSelect
            label="prev-year-select"
            select_options={period_year_options}
            defaultValue={{
              value: period.prev_year.toString(),
              label: period.prev_year.toString(),
            }}
            handleSelectChange={handlePrevYearChange}
          />
        </div>

        {/* <ToggleSwitch
                    checked={checked}
                    setChecked={setChecked}
                /> */}
      </div>
    </div>
  );
}
