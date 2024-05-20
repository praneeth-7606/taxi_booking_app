import { NextResponse } from "next/server";
// import { MAPBOX_BASE_URL, SESSION_TOKEN } from "@/utils/constants";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"
export async  function GET(request:any){
    const {searchParams}=new URL(request.url);
    const searchText=searchParams.get('q')
    const res=await fetch(BASE_URL+'?q='+searchText+'&language=en&limit=8&session_token=0abfe70a-d585-47f1-88f6-3202cd10b76e&country=IN'+"&access_token="+process.env.MAPBOX_ACCESS_TOKEN,
    {
        headers:{
            "Content-Type":"application/json"

        }
    })
    const searchResult=await res.json();
    return NextResponse.json(searchResult)
}