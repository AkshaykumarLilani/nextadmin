import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchUser, updateUser } from "../../../lib/actions";

const SingleUserPage = async ({ params }) => {

    const { id } = params;
    const user = await fetchUser(id);
    console.log(user)

    return (
        <>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer}>
                        <Image src={user.img || "/noavatar.png"} alt="" fill />
                    </div>
                    {user.username}
                </div>
                <div className={styles.formContainer}>
                    <form action={updateUser} className={styles.form}>
                        <input type="hidden" name="id" value={user.id} />
                        <label>Username</label>
                        <input type="text" name="username" defaultValue={user.username} autoComplete="off" />
                        <label>Email</label>
                        <input type="email" name="email" defaultValue={user.email} />
                        <label>Password</label>
                        <input type="password" name="password" autoComplete="off" />
                        <label>Phone</label>
                        <input type="text" name="phone" defaultValue={user.phone} />
                        <label>Address</label>
                        <textarea type="text" name="address" defaultValue={user.address} />
                        <label>Is Admin?</label>
                        <select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <label>Is Active?</label>
                        <select name="isActive" id="isActive"  defaultValue={user.isActive}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SingleUserPage;
