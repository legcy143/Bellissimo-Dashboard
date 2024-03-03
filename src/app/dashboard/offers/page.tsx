"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAdmin } from "@/stores/useAdmin";
import React from "react";
import NewOffer from "./NewOffer";

export default function page() {
  const { allOffers, fetchOffers, DeleteOffers }: any = useAdmin();
  React.useEffect(() => {
    if (allOffers.length == 0) {
      fetchOffers();
    }
  }, []);
  return (
    <div>
      <header className="flex items-center gap-5 justify-between my-5">
        <div>
          <h1 className="d_heading">All offers</h1>
          <h1 className="d_paragraph">View and manage offers</h1>
        </div>
        {/*  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add new offer</Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <NewOffer />
          </SheetContent>
        </Sheet>
      </header>
      <div className="p-2 flex  justify-center gap-2 flex-wrap">
        {allOffers.length == 0 && <p>No Offer Found</p>}
        {allOffers?.map((e: any) => {
          return (
            <ProductCard
              key={e?._id}
              image={e?.image}
              _id={e?._id}
              description={e?.description}
              amount={e?.amount}
              title={e?.title}
            />
          );
        })}
      </div>
    </div>
  );
}

const ProductCard = ({ image, title, description, amount, _id }: any) => {
  const { DeleteOffers }: any = useAdmin();
  return (
    <Card className="max-w-72">
      <CardContent className="p-4 md:p-6 flex flex-col">
        <div className="grid gap-4">
          <img
            alt="img"
            className="aspect-video object-cover rounded-lg overflow-hidden"
            src={image}
          />
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold leading-none">{title}</h2>
            <p className="text-sm leading-normal text-gray-500 dark:text-gray-400">
              {description}
            </p>
            <div className="flex items-center gap-2 text-lg font-bold">
              <div>₹ {amount}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3 mt-auto">
          <Button
            variant={"destructive"}
            onClick={() => {
              DeleteOffers(_id);
            }}
          >
            Delete
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Update</Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <NewOffer  isUpdate={true} PrevData={{ image, title, description, amount:amount.toString(), _id }}/>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};
