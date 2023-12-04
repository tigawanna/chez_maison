
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { PrintThis } from "../../components/print/PrinThis";
import { useDocumentTitle } from "../../shared/hooks/useDocumentTitle";
import { MonthlyBills } from "../../state/api/bills";


interface PrintProps {

}
interface TheTableState {
  title: string
  bills: MonthlyBills[]
}
export default function Print({}:PrintProps){
  const componentRef = useRef(null);
  const { state } = useLocation();
  const print_state = state as TheTableState

  useDocumentTitle(print_state.title)
  
  return (
    <div>
      <ReactToPrint
        trigger={() => <button className='p-2 bg-slate-600 text-white fixed top-[12%] left-[50%] z-50'>
          <FaPrint /></button>}
        content={() => componentRef.current}
      />
      <PrintThis
        title={print_state.title}
        bills={print_state.bills}
        ref={componentRef} />
    </div>
  );
};


