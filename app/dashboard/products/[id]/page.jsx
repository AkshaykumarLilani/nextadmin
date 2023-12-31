import styles from "../../../ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import { fetchProduct, updateProduct } from "../../../lib/actions";

const SingleProductPage = async ({ params }) => {
    const { id } = params;
    const product = await fetchProduct(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
                {product.title}
            </div>
            <div className={styles.formContainer}>
                <form action={updateProduct} className={styles.form}>
                    <input type="hidden" name="id" value={product.id} />
                    <label>Title</label>
                    <input type="text" name="title" defaultValue={product.title} />
                    <label>Price</label>
                    <input type="number" name="price" defaultValue={product.price} />
                    <label>Stock</label>
                    <input type="number" name="stock" defaultValue={product.stock} />
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder={product.color || "color"}
                    />
                    <label>Size</label>
                    <textarea
                        type="text"
                        name="size"
                        placeholder={"size"}
                        defaultValue={product.size}
                    />
                    <label>Cat</label>
                    <select name="cat" id="cat" defaultValue={product.cat}>
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label>Description</label>
                    <textarea
                        name="desc"
                        id="desc"
                        rows="10"
                        defaultValue={product.desc}
                    ></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default SingleProductPage;
