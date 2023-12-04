import {
  UtilityShopsCollection,
  UtilityShopsResponse,
} from "@/lib/pb/db-types";
import {
  SortParam,
  TypedRecordListQueryParams,
} from "@/lib/pb/typed-pocketbase";
import { tryCatchWrapper } from "@/utils/async";
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { useQuery } from "@tanstack/react-query";
import { navigate, usePageContext } from "rakkasjs";
import {
  GenericCollection,
  expand,
  fields,
  like,
  or,
  sort,
} from "typed-pocketbase";
import { ShopForm } from "../components/ShopForm";
import { CollectionModel } from "pocketbase";

type SortFn = typeof sort<UtilityShopsResponse>;
// type SortParams = Parameters<SortFn>[0]

type queryParams = TypedRecordListQueryParams<UtilityShopsCollection, any, any>;

interface UseShopsListProps {
  page_size?: number;
  pb_query_params?: TypedRecordListQueryParams<UtilityShopsCollection, any, any>;
}

export function useShopsQuery({
  page_size = 12,
  pb_query_params,
}: UseShopsListProps) {

  const page_ctx = usePageContext();
  const searchQuery = useSearchWithQuery();
  const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;

  const query = useQuery({
    queryKey: ["utility_shops", searchQuery?.debouncedValue, page_number],
    queryFn: () =>
      tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("utility_shops")
          .getList(page_number, page_size, {
            // ...pb_query_params,
            // filter: `shop_number~"${searchQuery.debouncedValue}"`,
            filter:or(["tenant.username","~",searchQuery.debouncedValue],
            ["shop_number","~",searchQuery.debouncedValue]),
            expand: expand({
                tenant: true,
            })
          }),
      ),
  });
  function handleChange(e: any) {
    searchQuery.setKeyword(e.target.value);
  }
  const total_pages = query?.data?.data?.totalPages;
  const pages_arr = numberToArray(total_pages!);
  function goToPage(page: number) {
    page_ctx.url.searchParams.set("p", page.toString());
    navigate(page_ctx.url);
  }
  return { query, searchQuery, page_ctx,page_number, handleChange, goToPage, pages_arr };
}
