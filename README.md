# Utilities 

![table-for-react](https://user-images.githubusercontent.com/72096712/230765996-341c20e8-999d-4775-98f1-a2e47a7a46c4.png)


A simple react app for utilities entry and viewing

Built this app to fix the issue i had when making utilities meter readings across the building we were managing.

The process would begin with a printed spreadsheet of the shop names with their respective meters and a spot for thier readings.

The job was simple , populate the empty spots. but it was very common to be doubtful because some of the meters would be foggy from the inside or just hard to read , referencing the former readings would be helpfull but doing it manually could wind up being as eronious and require full attention

so i came up with the idea of just putting it all a database and have a dashboard for it.

### frontend 
React SPA with vite and typescript
- Tanstack-query + Zustand
- Tailwind css + Mantine UI
- React-router-dom
- Pocketbase SDK
  

  

getting setup 
for the front end you can just clone this repo
```sh
git clone https://github.com/tigawanna/utilities.git

```
run the command 
```sh
npm install
npm run dev
```

then include the .env file

```env
VITE_PB_URL=http://127.0.0.1:8090
VITE_ENV=DEV
```

### backend
- Pocketbase  

you can either use my built pocketbase executable

[Download linux executable file](https://github.com/tigawanna/devhub-backend/raw/master/pocketbase)



[Download windows executable file](https://github.com/tigawanna/devhub-backend/raw/master/pocketbase.exe)

[source code](https://github.com/tigawanna/devhub-backend)

this would be the easiest option since it has one of the custom routes that am using

or you could download the [official pocketbase](https://pocketbase.io/docs/) and add the custo routes yourself 

⚠ Am primarily a frontend dev so pardon the messy go code.

## The collections
### Tenants:
```ts
export interface TenantResponse {
    id: string
    supa_id:string;
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
    contact: string
    email: string
    details: string
    expand: TenantExpand
}
```
[Tenants](https://github.com/tigawanna/utilities/blob/cc391287e74c5163f7de52fbc843fe0a93ec5293/src/state/api/tenant.ts)

This has to be the first set of data to  be entered because the next collection will depend on it's ID

we can then consume it in the frontend

```ts

export async function getTenants() {
    try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('tenants').getFullList<TenantResponse>({
            // sort: '-created',
            expand:'shops(tenant)'
    });
    return records
    } catch (error) {
        console.log(error)
        throw error
    }
}

const query = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants
  })
```

```ts
expand:'shops(tenant)'
```
and in here we're doing an [indirect expand](https://pocketbase.io/docs/expanding-relations) on the collection shops where the shop tenant filed === to the current tenant , this comes in use fll when you want to associate data with no direct relation , by doing this it returns a list of tenants + shops they own        


### Shops
```ts
export interface ShopExpand{
    tenant:TenantResponse
    "bills(shop)":Omit<BillResponse,"expand">[]
}

export interface ShopResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    tenant: string
    shop_number: string
    supa_tenant: string
    utils: "elec"|"water"|"both"
    order: number
    is_vacant:boolean
    supa_id: string
    expand:ShopExpand
}

```
[shops](https://github.com/tigawanna/utilities/blob/ee8bd47108304c0ad002dc3183e2ebbeb5c9ec39/src/state/api/shops.ts)

Since the shops are fixed and will retain their shop numbers even ater tenant change the tenaant field will be a relation to the tenant collection 

rontend:
```ts
export async function getShops() {
    try {
        const records = await pb.collection('shops').getFullList<ShopResponse>({
            sort: 'order',
            expand: 'tenant',
        });
        return records
    } catch (error) {
        console.log("error loading shops",error)
        throw error
    }
}

  const query = useQuery({
    queryKey: ['shops'],
    queryFn:getShops
  })

```

Here we'll just expandthe tenanat associated with the shop in order to get the current shop name and which is the tenant name 


### Bills
```ts
export interface BillExpand {
    shop:ShopResponse
}
export interface BillResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    shop: string
    elec_readings: number
    water_readings: number
    month: number
    year: number
    expand:BillExpand 
}

```

[bills](https://github.com/tigawanna/utilities/blob/cc391287e74c5163f7de52fbc843fe0a93ec5293/src/state/api/bills.ts)

Every bill created will be associated to a shop and will be a relation to the shop collection

This is where things get a little tricky since my requirents are etching all the shops then the bills associated with each shop or the current month as curr_elec and curr_water  and another similar one but with prev_water and prev_elec based on vlaues form the same shop but the previous month  in order to obtain 

```ts
export interface MonthlyBills {
    shop_id: string;
    curr_bill_id: string;
    prev_bill_id: string;
    shop_number: string;
    shop_name: string;
    curr_year: string;
    curr_month: string;
    prev_year: string;
    prev_month: string;
    list_order: string;
    current_elec: string;
    previous_elec: string;
    elec_diff: string;
    current_water: string;
    previous_water: string;
    water_diff: string;
}

```

to power a UI like this 

![bills home screen](https://github.com/tigawanna/utilities/raw/master/docs/imgs/Screenshot%202023-04-06%20183144.png)


with pocketbase 0.14 view collections were introduced where we can compose collections into one read only view but i couldn't get it to work for my use case so i had to extend pocketbase and add custom route that will wrap this query

```sql
SELECT
sh.id as shop_id,
IFNULL(curr.id,"blank") as curr_bill_id,
IFNULL(prev.id,"blank") as prev_bill_id,

sh.shop_number as shop_number,
te.name as shop_name,
sh."order" as list_order,

IFNULL(curr.month,0) as curr_month,
IFNULL(prev.month,0) as prev_month,
IFNULL(curr.year,0) as curr_year,
IFNULL(prev.year,0) as prev_year,


IFNULL(curr.elec_readings,0) as current_elec,
IFNULL(prev.elec_readings,0) as previous_elec,
IFNULL((curr.elec_readings - prev.elec_readings),0) elec_diff,
IFNULL(curr.water_readings,0) as current_water,
IFNULL(prev.water_readings,0) as previous_water,
IFNULL((curr.water_readings - prev.water_readings),0)water_diff



FROM shops sh
LEFT JOIN bills as curr
ON curr.shop = sh.id AND curr.month = {:curr_month} AND curr.year = {:curr_year}
LEFT JOIN bills as prev
ON prev.shop = sh.id AND prev.month = {:prev_month} AND prev.year = {:prev_year}
LEFT JOIN tenants te
ON te.id = sh.tenant
WHERE sh.is_vacant = false
ORDER BY sh."order";
```
[complete route code](https://github.com/tigawanna/devhub-backend/blob/master/bills.go)


Then we consume it o the frontend 
```ts
export async function getMonthlyBills(period:BillsPeriod){
try {
    const records = await pb.send<MonthlyBills[]>('/monthly_bills',{params:period})
    return records
} catch (error) {
    console.log("error getting monthly bills  === ", error)
    throw error
}
}
```
> Note that the `pb.send()` method can now take a generic type  that defines the response type


On the front end i output it into a table i made using Mantine Table and made a [period-picker](https://github.com/tigawanna/utilities/blob/49a5960a10bd0b158c65250b448fc3717953c8f7/src/components/bills/PeriodPicker.tsx) component that allows you to control which month's bills curr and prev are loaded

 As for the motations , the pocketbae sdk amkes it super easy by just calling the `.add()` ,`.update()  method on the `pb.collection()` method

As for the Pocketbase deployment i used [fly.io](https://fly.io) and [vercel](https://vercel.com) for the react 

### extras

- query invalidation : on mutations you might want to invalidate the queries so the useQuery refetches

in tanstack-query v5 , we can now define a global query invalidatio pattern

```ts
const queryClient: QueryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {

      if (Array.isArray(mutation.meta?.invalidates)) {
        mutation.meta?.invalidates.forEach((key)=>{
          return queryClient.invalidateQueries({
            queryKey:key
          })
        })


      }}
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

```
So we pass in an array of queryKrys we want invalidated , there's a bunch of [query invaliation patterns](https://tanstack.com/query/v5/docs/react/guides/query-invalidation) for example the below will invaidate all the queries with the containig `[]monthly-bills]`

```ts
    const new_bill_mutation = useMutation({
        mutationFn: (input: BillMutationFields) => addBill(input),
        meta: { invalidates: [["monthly-bills"]] },
    })
``` 

- the switch on the period-picker component is to make sure the previous month and yaer changes depending on the current month picked


- adding collection/recordrules to your pocketbase to lock it down even further ex: `@requset.auth.id!=null&&request.auth.veriied == true`

- [simple helper functions](https://github.com/tigawanna/utilities/blob/01472732a137b2496021fbd873036255b5cebe82/src/utils/date-helpers.ts) for date manipilations 

- [zustand global state](https://github.com/tigawanna/utilities/blob/a002642a56084016c0c55456f20747c3c5cf9cfe/src/state/zustand/bills.ts)

