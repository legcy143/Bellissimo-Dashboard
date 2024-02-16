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

export default function CreateCategories() {
  const { uploadImage, uploadedUrl, addCategory } = useAdmin();
  const [category, setcategory] = useState("");
  const [icon, seticon] = useState<File>();
  return (
    <main>
      <SheetHeader>
        <SheetTitle>Create new category</SheetTitle>
        <SheetDescription>
          Create new category, Click create when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-3 py-5">
        <Label htmlFor="newcategories" className="text-left">
          Name Category
        </Label>
        <Input
          id="newcategories"
          placeholder="e.g : medicines etc.."
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <div className="grid gap-3 mb-5">
        <Label htmlFor="newcategories" className="text-left">
          Upload Icon
        </Label>
        <Input
          id="icon"
          type="file"
          onChange={(e: any) => {
            const file = e.target.files[0];
            seticon(file);
          }}
          // className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <SheetFooter>
        <SheetClose>
          <Button
            type="submit"
            onClick={() => {
              addCategory({ name: category, icon });
            }}
          >
            Create Category
          </Button>
        </SheetClose>
      </SheetFooter>
    </main>
  );
}
