import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAdmin } from "@/stores/useAdmin";
import { uploadSingleFile } from "@/utils/upload";
import { Textarea } from "@/components/ui/textarea";

export default function NewOffer({ isUpdate = false, PrevData }: any) {
  const { AddOffers ,UpdateOffers} = useAdmin();
  const [title, settitle] = useState(PrevData?.title || "");
  const [description, setdescription] = useState(PrevData?.description || "");
  const [amount, setamount] = useState(PrevData?.amount || "");
  const [image, setImage] = useState<any>("");
  return (
    <main>
      <SheetHeader>
        <SheetTitle>Create new offer</SheetTitle>
        <SheetDescription>
          Create new offer, Click create when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-3 py-5">
        <Label htmlFor="title" className="text-left">
          title
        </Label>
        <Input
          autoFocus
          id="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
          className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <div className="grid gap-3 py-5">
        <Label htmlFor="description" className="text-left">
          description
        </Label>
        <Textarea
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <div className="grid gap-3 py-5">
        <Label htmlFor="amount" className="text-left">
          amount
        </Label>
        <Input
          type="number"
          id="amount"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            setamount(e.target.value);
          }}
          className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <div className="grid gap-3 mb-5">
        <Label htmlFor="image" className="text-left">
          Upload image
        </Label>
        <Input
          id="image"
          type="file"
          onChange={async (e: any) => {
            setImage(e.target.files[0]);
          }}
          // className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <SheetFooter>
        <SheetClose>
          {isUpdate ? 
           <Button
           type="submit"
           onClick={() => {
            UpdateOffers({ title, description, amount: +amount, image , _id:PrevData?._id });
           }}
           >
             Update  offer
           </Button>
           :
          <Button
          type="submit"
          onClick={() => {
            AddOffers({ title, description, amount: +amount, image });
          }}
          >
            Add New Offer
          </Button>
          }
        </SheetClose>
      </SheetFooter>
    </main>
  );
}
