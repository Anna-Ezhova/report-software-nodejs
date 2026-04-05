import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import qs from 'qs'

export const getLatestReport = async (
  collection: string,
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;

  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}?sort=-createdAt`;
  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    if (data.docs.length === 0) {
      return "Keine Berichte vorhanden";
    }

    return data.docs[0];
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getAllReports = async (
  collection: string,
  token: string | undefined,
  sort: string = "-createdAt",
) => {
  

  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}?sort=-${sort}?limit=100`;
  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    if (data.docs.length === 0) {
      return "Keine Berichte vorhanden";
    }

    return data.docs;
  } catch (error) {
    console.error("Error:", error);
  }
};


export const getAllCustomers = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;

  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/customers?limit=50&sort=name&page=1&where[or][0][and][0][_status][not_equals]=archived`;
  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    if (data.docs.length === 0) {
      return "Keine Kunden vorhanden";
    }

    return data.docs;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getLastFive = async (
  collection: string,
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;

  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}?sort=-createdAt&limit=5`;
  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    if (data.docs.length === 0) {
      return "Keine Berichte vorhanden";
    }

    return data.docs;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDocById = async (
  collection: string,
  id: string,
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}/${id}`;

  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};





export const getLatestReportByTopic = async (
  collection: string,
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;

  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}?sort=-createdAt&where[or][0][and][0][topic][equals]=$`;
  try {
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    const data = await req.json();

    if (data.docs.length === 0) {
      return "Keine Berichte vorhanden";
    }

    return data.docs[0];
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
* Build a safe URL for querying a Payload CMS collection via REST API,
* searching across multiple fields (using `contains` operator) for a searchTerm.
*
* @param baseUrl The base URL of your Payload backend API, e.g. "https://api.example.com"
* @param collectionSlug The slug of the collection you want to query, e.g. "soc-generic"
* @param searchTerm The user‐supplied search term string
* @param fields Array of field names (strings) which are allowed to be searched
* @param limit Optional max number of results
* @param page Optional page number
*
* @returns Fully formed URL string you can fetch with GET
*/
export function buildPayloadSearchUrl(
  baseUrl: string | undefined,
  collectionSlug: string,
  searchTerm: string,
  fields: string[],
  limit?: number,
  page?: number
): string {
  const trimmed = searchTerm.trim();
  if (!trimmed) {
    throw new Error('searchTerm must be non-empty');
  }
 
  // escape characters for safe use inside URL param
  const escapeForUrl = (s: string) =>
    encodeURIComponent(s.replace(/[&=+?]/g, ''));
 
  const safeTerm = escapeForUrl(trimmed);
 
  // Validate fields: only allow alphanumeric+underscore to avoid weird operators / injection
  const validField = (f: string) => /^[a-zA-Z0-9_]+$/.test(f);
  const safeFields = fields.filter(validField);
  if (safeFields.length === 0) {
    throw new Error('No valid fields provided to search');
  }
 
  const params = new URLSearchParams();
 
  // Build the OR array via where[or][0][field][contains]=safeTerm etc
  safeFields.forEach((field, idx) => {
    params.set(`where[or][${idx}][${field}][contains]`, safeTerm);
  });
 
  if (limit !== undefined) {
    params.set('limit', String(limit));
  }
  if (page !== undefined) {
    params.set('page', String(page));
  }
 
  // Final URL
	//@ts-ignore
  return `${baseUrl.replace(/\/+$/, '')}/api/${collectionSlug}?${params.toString()}`;
}

export const SearchFunction = async (
	collection: string,
	keywordString: string,
	token: string | undefined,
) =>  {

	const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
	const fields = ["events", "special_events"]
	const url = buildPayloadSearchUrl(baseUrl, collection, keywordString, fields, 10)
	console.log(url)
	/* const keywords = keywordString
    .split(/\s+/)
    .map(k => k.trim())
    .filter(k => k.length > 0)

  if (keywords.length === 0) {
    
  }

	const whereClauses = keywords.map((kw) => {
    return {
      or: [
        { title: { like: kw } },
        { body:  { like: kw } },
      ],
    }
  })

	const where = { and: whereClauses }

	const queryObj = {
    where,
    limit: 50,    // adjust as needed
    page: 1,
    select: { title: true, body: true, slug: true }  // optionally select fields
  }
  const qstr = qs.stringify(queryObj, { encode: true, arrayFormat: 'brackets' })

	const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${collection}`

	console.log(qstr) */
	
	try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
    if (!response.ok) {
      const text = await response.text()
      console.error('Search error:', text)
    }
    const data = await response.json()
		const docs = await data.docs
		console.log(docs)
		 return await docs 

		
   
  } catch (err) {
    console.error('Search error:', err)
    
  }
}




