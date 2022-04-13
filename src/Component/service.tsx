export const GetPopsts = async (pageNo: number) => {
    return await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`)
}