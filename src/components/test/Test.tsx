
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { AppUser } from '../../state/types/base';
import { getAllRecords, getProdBills, migrateRecords } from '../../state/api/migrate';
import { useState } from 'react';

interface TestProps {
  user:AppUser
}

export default function Test({user}: TestProps) {

  const [table,setTable]= useState <"bills" | "tenants" | "shops" >("tenants")


const query = useQuery({
  queryKey: ['test',table],
  queryFn:()=>getAllRecords(table),
  
  })

const mutation = useMutation({
  mutationFn: (table: "bills" | "tenants" | "shops")=>migrateRecords(table)
})


  if (mutation.isPending) {
    return (
      <div className='w-full h-full text-2xl text-green-400 flex justify-center items-center'>
        Mutation in progress .... </div>
    )
  }
  if (mutation.isError) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50%] h-[60%] bg-red-200 text-red-900 flex justify-center items-center'>
          Mutation error {JSON.stringify(mutation.error)}
        </div>
      </div>
      )
  }



if(query.isFetching){
  return(
    <div className='w-full h-full text-2xl text-blue-400 flex justify-center items-center'>Loading...</div>
  )
}
  if (query.isError) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50%] h-[60%] bg-red-200 text-red-900 flex justify-center items-center'>
         {JSON.stringify(query.error)}
        </div>
        </div>
    )
  }
console.log("test query ==== ", query.data)
console.log("test mutation ==== ", mutation.data)
return (
  <div className=" w-full h-full flex flex-col justify-center items-center  p-5 gap-5" >
    
    <h1 className='text-2xl font-bold'>
    {table}
    </h1>

    <div className='p-5 text-lg flex gap-2 items-center  justify-center'>

      <button
        onClick={() => setTable("tenants")}
        className='border rouneded-lg rounded-lg p-5 text-lg '>
        Tenants
      </button>

      <button
        onClick={() => setTable("shops")}
        className='border rouneded-lg rounded-lg p-5 text-lg '>
        Shops
      </button>

      <button
        onClick={() => setTable("bills")}
        className='border rouneded-lg rounded-lg p-5 text-lg '>
        Bills
      </button>
    </div>

    <button 
     onClick={()=>mutation.mutate(table)}
    className='bg-purple-600 rounded-lg text-2xl font-bold p-4'>
      DO IT
      </button>

    <div className='p-5 border rounded-lg flex flex-col items-center justify-center gap-3'>
      data success
      {query.data?.map((item)=>(
      <div className='p-2 w-full border roumded-xl'>
          {JSON.stringify(item)}
      </div>)
      )}
    </div>

</div>
);}
