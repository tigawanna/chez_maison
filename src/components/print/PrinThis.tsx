import React from 'react'
import { MonthlyBills } from '../../state/api/bills';
import { BillsTable } from '../bills/BillsTable';


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

      return (
        <div className='m-5 '>
         <div  className="capitaliza text-[15px]  m-1">{this.state.title}</div> 
        <BillsTable bills={this.state.bills} updating={false} printing/>
      </div>
      );
    }
  }
