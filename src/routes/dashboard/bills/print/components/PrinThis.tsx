import React from 'react'
import { MonthlyBills } from '../../api/bills';
import { BillsTable } from '../../components/BillsTable';
import { billsTableColumn } from '../../components/table/columns';
import { DataTable } from '../../components/table/data-table';



type MyProps = {
title:string  
ref: React.MutableRefObject<null>
bills: MonthlyBills[]
};
type MyState = {
  title:string
  bills:MonthlyBills[]
}

export class PrintThis extends React.Component<MyProps, MyState> {
    constructor(props:any){
        super(props);
        this.state={
            bills:this.props.bills,
            title:this.props.title
        }

    }

    render() {

      const columns = billsTableColumn(false);
      return (
        <div className="p-2 flex flex-col w-full">
          <div  className="capitaliza text-[15px]  m-1">{this.state.title}</div> 
          <DataTable
            columns={columns}
            data={this.state.bills}
            editing={false}
            theadClassName="static"
          />
        </div>
      );
    }
  }
