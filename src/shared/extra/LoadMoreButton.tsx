import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

interface LoadMoreButtonProps<T> {
    query: UseInfiniteQueryResult<InfiniteData<T>, Error>
}

export function LoadMoreButton<T,>({query}:LoadMoreButtonProps<T>){
 if(!query.hasNextPage){
    return null
 }   
if(query.isFetchingNextPage){
    return <div className="w-full h-10  flex items-center justify-center">Loading more...</div>
}
return (

    <div>
        {(!query.isPending && !query.isError ) &&
            <button
                className="text-accent font-bold m-3  rounded"
                onClick={() => query.fetchNextPage()}
                disabled={!query.hasNextPage || query.isFetchingNextPage}
            >
                Load More
            </button>
        }
    </div>
);
}
