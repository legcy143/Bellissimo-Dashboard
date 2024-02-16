"use client"
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/stores/useAdmin'
import React, { useState } from 'react'

export default function Dashboard() {
    const { allUsers, allOrders, allProducts }: any = useAdmin()
    const [miniDetail, setminiDetail] = useState(
        [
            { title: "users", length: allUsers.length },
            { title: "products", length: allProducts.length },
            { title: "orders", length: allOrders.length },
        ]
    )
    return (
        <main>
            comming soon . . .
            <section className='gap-5 p-5 flex'>
                {/* {miniDetail?.map((e, i) => {
                    return <div
                        key={i}
                        className='p-3 capitalize min-w-[10rem] flex flex-col border rounded-md'
                    >
                        <h2 className='text-xl font-semibold'>{e.title}</h2>
                        <p>{e.length}</p>
                    </div>
                })} */}
            </section>
        </main>
    )
}
