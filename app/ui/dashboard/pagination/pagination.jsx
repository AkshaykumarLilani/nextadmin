"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ITEMS_PER_PAGE } from "../../../lib/data";

const Pagination = ({ count }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || 1;

    const params = new URLSearchParams(searchParams);

    const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext = ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;

    const handleChangePage = (type) => {
        type === "prev"
            ? params.set("page", parseInt(page) - 1)
            : params.set("page", parseInt(page) + 1);
        replace(`${pathname}?${params}`);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                disabled={!hasPrev}
                onClick={() => handleChangePage("prev")}
            >
                Previous
            </button>
            <button
                className={styles.button}
                disabled={!hasNext}
                onClick={() => handleChangePage("next")}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
