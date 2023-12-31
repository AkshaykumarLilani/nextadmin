import React from 'react'
import styles from "./sidebar.module.css";
import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdOutlineSettings, MdHelpCenter, MdWork, MdAnalytics, MdPeople, MdLogout } from "react-icons/md";
import MenuLink from './menuLink/MenuLink';
import Image from 'next/image';
import { auth, signOut } from '../../../auth';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />
      }
    ]
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />
      }
    ]
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />
      }
    ]
  }
]

async function Sidebar() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src={session?.user?.img || "/noavatar.png"} alt="avatar" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>{session?.user?.username || "John Doe"}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map(cat => {
          return <li key={cat.title} className={styles.cat}>
            <span>{cat.title}</span>
            {cat.list.map(item => <MenuLink item={item} key={item.title} />)}
          </li>
        })}
      </ul>
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  )
}

export default Sidebar