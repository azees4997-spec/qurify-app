import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const query = searchParams.get("search") || "";
