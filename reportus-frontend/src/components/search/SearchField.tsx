"use client";
import { SearchString, TSearchString } from "@/lib/validators/forms/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchFunction, getAllReports } from "@/server/helperFunctions";
import { useEffect, useState } from "react";
import { SocGeneric } from "@/payload-types";
import { DataTable } from "../tables/DataTable";
import { columnsSocReports } from "../tables/column-data";


interface User {
	token: string | undefined; 
}



const SearchField = ({token}:User) => {

	
const [data, setData] = useState<SocGeneric[]>([])
const [page, setPage] = useState<Number>(0)
const [limit, setLimit] = useState<Number>(0)

const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/soc_generic`;

 useEffect(() => {
    // Fetch users from Payload CMS API using fetch
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        setData(data.docs); // Assuming the response contains the list of users
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });
  }, [url]); 


	const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSearchString>({
    resolver: zodResolver(SearchString),
  });

	const router = useRouter();

	const onSubmit: SubmitHandler<TSearchString> = async ({keywordString} : TSearchString) => {

		console.log(`Search keywordString is ${keywordString}`)

		const collection = "soc_generic"

		const response = await SearchFunction(
			collection,
      keywordString,
      token,
    ) ;


		 
		setData(response)
		 
    
		return

	}

	return (
		
		<div>	<FormControl className="container relative flex flex-row items-center justify-center">
			
		<TextField className="flex"  id="outlined-basic" label="Outlined" variant="outlined" {...register("keywordString")}></TextField>
		<Button className="flex pt-2" variant="contained" onClick={handleSubmit(onSubmit)}>Search</Button>
		</FormControl>
		<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0"><DataTable columns={columnsSocReports} data={data}></DataTable>
		</div>
		</div>
	)

}

export default SearchField