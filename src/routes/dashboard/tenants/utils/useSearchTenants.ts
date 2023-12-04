import { tryCatchWrapper } from "@/utils/async";
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { useQuery } from "@tanstack/react-query";
import { usePageContext} from "rakkasjs";


export function useSearchTenants(default_keyword?:string) {
    const page_ctx = usePageContext()
    const searchQuery = useSearchWithQuery({search_query:false,default_value:default_keyword});

    const query = useQuery({
        queryKey: ["utility_tenants", searchQuery?.debouncedValue],
        queryFn: () => tryCatchWrapper(page_ctx.locals.pb?.
            collection("utility_tenants").getList(1,10, {
                sort: "-created",
                filter: `username~"${searchQuery.debouncedValue}"||email~"${searchQuery.debouncedValue}"`,
                // expand: expand({ "utility_shops(tenant)": true }),
            })),
    })
    function handleChange(e: any) {
        searchQuery.setKeyword(e.target.value);
    }
    const total_pages = query?.data?.data?.totalPages;
    const pages_arr = numberToArray(total_pages!);

    return {
        query,
        searchQuery,
        pages_arr,
        handleChange
    }
}
