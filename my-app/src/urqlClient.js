import {
	createClient,
	ssrExchange,
	dedupExchange,
	cacheExchange,
	fetchExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });
const client = createClient({
	url: "http://localhost:8080/query",
	exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
	fetchOptions: () => {
		return { headers: {} };
	},
});

export { client, ssrCache };
