"use client"
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/stores/useAdmin'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TbEyeSearch } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Orders() {
  const { fetchAllUsers, allUsers }: any = useAdmin();
  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <main>
      <header className='flex items-center gap-5 justify-between my-5'>
        <div>
          <h1 className='d_heading'>All orders</h1>
          <h1 className='d_paragraph'>View and manage Orders</h1>
        </div>
        {/*  */}

      </header>
      {/* categores  */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[2rem]">S.No</TableHead>
            <TableHead>firstname</TableHead>
            <TableHead>lastname</TableHead>
            <TableHead>phoneNumber</TableHead>
            <TableHead>email</TableHead>
            <TableHead>orders</TableHead>
            <TableHead>cart</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.length == 0 ? <p>no products found</p> :
            <>
              {allUsers.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell>{e.name.firstName}</TableCell>
                  <TableCell>{e.name.lastName}</TableCell>
                  <TableCell>{e.phoneNumber}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.orders?.length} items</TableCell>
                  <TableCell>{e.cart?.length} items</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className='ml-auto flex items-center w-fit justify-center gap-3'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <TbEyeSearch />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{e.name.firstName}</DialogTitle>
                            <DialogDescription>
                              {e.phoneNumber}
                              {e.email}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogTrigger asChild>
                              <Button variant="outline">ok</Button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>total</TableCell>
            <TableCell className='text-right'>{allUsers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  )
}

