import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAdmin } from '@/stores/useAdmin'

export default function CreateLocation() {
  const { addLocation }: any = useAdmin();
  const [name, setname] = useState("")
  const [pincode, setpincode] = useState("")
  const [deliveryCharge, setdeliveryCharge] = useState("")
  const [location, setlocation] = useState("")
  return (
    <main className='overflow-y-auto max-h-full'>
      <SheetHeader>
        <SheetTitle>create new delivery location</SheetTitle>
        <SheetDescription>
          create new delivery location , Click create when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-3 py-5 p-1">
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input
          id="name"
          placeholder='e.g : city etc..'
          value={name}
          onChange={(e) => { setname(e.target.value) }} className="col-span-3"
          autoComplete={'off'}
        />
        <Label htmlFor="location" className="text-left"> Location</Label>
        <Input
          id="location"
          placeholder='e.g : delhi ncr etc..'
          value={location}
          onChange={(e) => { setlocation(e.target.value) }} className="col-span-3"
          autoComplete={'off'}
        />
        <Label htmlFor="pincode" className="text-left"> Pincode</Label>
        <Input
          type='number'
          id="pincode"
          placeholder='e.g : 888888 etc..'
          value={pincode}
          onChange={(e) => { setpincode(e.target.value) }} className="col-span-3"
          autoComplete={'off'}
        />
        <Label htmlFor="deliverycharge" className="text-left"> Delivery Charge</Label>
        <Input
          type='number'
          id="deliverycharge"
          placeholder='e.g : 50 etc..'
          value={deliveryCharge}
          onChange={(e) => { setdeliveryCharge(e.target.value) }} className="col-span-3"
          autoComplete={'off'}
        />
      </div>
      <SheetFooter>
        <SheetClose>
          <Button
            type="submit"
            onClick={() => addLocation({ name, pincode: +pincode, deliveryCharge: +deliveryCharge, location })}
          >
            Create location
          </Button>
        </SheetClose>
      </SheetFooter>
    </main>
  )
}
