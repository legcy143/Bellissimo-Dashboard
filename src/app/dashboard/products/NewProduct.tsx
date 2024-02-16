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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/stores/useAdmin";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewProduct() {
  const { addProducts, allCategory, allLocations } = useAdmin();
  const [deliveryLocations, setDeliveryLocations] = useState<string[]>([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    category: "",
    deliveryLocations: [""],
    eanCode: "",
    hsnCode: "",
    multiPack: false,
    howToUse: "",
    gstRate: 0,
  });

  const handleChange = (property: any, value: any) => {
    console.log(property, value);
    setProductData((prevProductData) => ({
      ...prevProductData,
      [property]: value,
    }));
  };

  return (
    <main className="overflow-y-auto max-h-full">
      <SheetHeader>
        <SheetTitle>create new product</SheetTitle>
        <SheetDescription>
          create new product , Click create when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-3 py-5 p-1">
        <Label htmlFor="productName" className="text-left">
          Product Name
        </Label>
        <Input
          id="productName"
          placeholder="Enter product name"
          value={productData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="col-span-3"
          autoComplete="off"
        />
        <Label htmlFor="productDescription" className="text-left">
          Product Description
        </Label>
        <Textarea
          id="productDescription"
          placeholder="Enter product description"
          value={productData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="col-span-3"
        />
        <div className="grid grid-cols-2 gap-3 w-full">
          <div>
            <Label htmlFor="productPrice" className="text-left">
              Product Price
            </Label>
            <Input
              type="number"
              id="productPrice"
              placeholder="Enter product price"
              value={productData.price}
              onChange={(e) => handleChange("price", +e.target.value)}
              className="w-full"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="productStock" className="text-left">
              Product Stock
            </Label>
            <Input
              type="number"
              id="productStock"
              placeholder="Enter product stock"
              value={productData.stock}
              onChange={(e) => handleChange("stock", +e.target.value)}
              className="w-full"
              autoComplete="off"
            />
          </div>
        </div>
        <Label htmlFor="productPrice" className="text-left">
          Product Images
        </Label>
        <Input
          type="file"
          multiple
          id="productImages"
          placeholder="Upload Images"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              handleChange("images", files);
            }else{
              alert('No files selected')
            }
          }}
          className="w-full"
          autoComplete="off"
        />
        <Label htmlFor="productCategory" className="text-left block">
          Product categories
        </Label>
        <Select
          onValueChange={(value) => {
            handleChange("category", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allCategory.map((category: any) => (
                <SelectItem value={category._id} key={category._id}>
                  <SelectLabel>{category.name}</SelectLabel>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor="productCategory" className="text-left block">
          Delivery Locations
        </Label>
        <Select
          onValueChange={(value) => {
            handleChange("deliveryLocations", [value]);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Delivery Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allLocations.map((deliveryLocation: any) => (
                <SelectItem
                  value={deliveryLocation._id}
                  key={deliveryLocation._id}
                >
                  <SelectLabel>{deliveryLocation.name}</SelectLabel>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label htmlFor="productEANCode" className="text-left">
          Product EAN Code
        </Label>
        <Input
          id="productEANCode"
          placeholder="Enter product EAN code"
          value={productData.eanCode}
          onChange={(e) => handleChange("eanCode", e.target.value)}
          className="col-span-3"
          autoComplete="off"
        />

        <Label htmlFor="productHSNCode" className="text-left">
          Product HSN Code
        </Label>
        <Input
          id="productHSNCode"
          placeholder="Enter product HSN code"
          value={productData.hsnCode}
          onChange={(e) => handleChange("hsnCode", e.target.value)}
          className="col-span-3"
          autoComplete="off"
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="productMultiPack"
            checked={productData.multiPack}
            onCheckedChange={(e: any) => handleChange("multiPack", e)}
            className="col-span-3"
          />
          <Label htmlFor="productMultiPack" className="text-left">
            Multi-Pack
          </Label>
        </div>

        <Label htmlFor="productHowToUse" className="text-left">
          How To Use
        </Label>
        <Textarea
          id="productHowToUse"
          placeholder="Enter instructions on how to use the product"
          value={productData.howToUse}
          onChange={(e) => handleChange("howToUse", e.target.value)}
          className="col-span-3"
        />

        <Label htmlFor="productGSTRate" className="text-left">
          GST Rate
        </Label>
        <Input
          type="number"
          id="productGSTRate"
          placeholder="Enter product GST rate"
          value={productData.gstRate}
          defaultValue={18}

          onChange={(e) => handleChange("gstRate", +e.target.value)}
          className="col-span-3"
          autoComplete="off"
        />
      </div>
      <SheetFooter>
        <SheetClose>
          <Button type="submit" onClick={() => addProducts(productData)}>
            Create Product
          </Button>
        </SheetClose>
      </SheetFooter>
    </main>
  );
}
