import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MdDashboard } from "react-icons/md";
import { FaCubes } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { IoLocation } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { HiViewGridAdd } from "react-icons/hi";

export default function DashboardSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const PathList = [
        {
            pathname: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />
        },
        {
            pathname: "orders",
            path: "/dashboard/orders",
            icon: <FaCubes />
        },
        {
            pathname: "products",
            path: "/dashboard/products",
            icon: <IoCartSharp />
        },
        {
            pathname: "users",
            path: "/dashboard/users",
            icon: <PiUsersFill />
        },
        {
            pathname: "categories",
            path: "/dashboard/categories",
            icon: <HiViewGridAdd />
        },
        {
            pathname: "delivery location",
            path: "/dashboard/locations",
            icon: <IoLocation />
        },
        {
            pathname: "marketing",
            path: "/dashboard/marketing",
            icon: <HiSpeakerphone />
        }
    ]


    return (
        <>
            {PathList.map((e: any) => {
                let active = "bg-primary text-secondary";
                let nonAcitive = "hover:underline";
                return (
                    <div
                        key={e.pathname}
                        onClick={() => { router.push(e.path) }}
                        className={`p-2 px-4 rounded font-medium capitalize cursor-pointer flex items-center gap-2 ${pathname == e.path ? active : nonAcitive}`}
                    >
                        {e.icon}
                        {e.pathname}
                    </div>
                )
            })}
        </>
    )
}
