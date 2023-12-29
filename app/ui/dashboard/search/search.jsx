"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const searchHandler = useDebouncedCallback((e) => {
        const { target: { value } } = e;
        const params = new URLSearchParams(searchParams);
        params.set("page", 1);
        if (value){
            params.set("q", value);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params}`);
    }, 300);

    return <div className={styles.container}>
        <MdSearch />
        <input
            type="text"
            placeholder={placeholder}
            className={styles.input}
            onChange={searchHandler}
        />
    </div>
}

export default Search;