
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAdmin } from '@/stores/useAdmin'

export default function UpdateProduct({ vName = "", vPincode="",vDeliveryCharge="",vLocation="", _id = "" }) {
    const { updateLocation }: any = useAdmin();
    const [name, setname] = useState(vName)
    const [pincode, setpincode] = useState(vPincode)
    const [deliveryCharge, setdeliveryCharge] = useState(vDeliveryCharge)
    const [location, setlocation] = useState(vLocation)
    return (
        <main>
            <SheetHeader>
                <SheetTitle>update product</SheetTitle>
                <SheetDescription>
                    Make changes to your product here. Click update when you're done.
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
                        onClick={() => updateLocation({ name, pincode: +pincode, deliveryCharge: +deliveryCharge, location }, _id)}
                    >
                        Update Categories
                    </Button>
                </SheetClose>
            </SheetFooter>
        </main>
    )
}
