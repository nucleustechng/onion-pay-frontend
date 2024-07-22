import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../@/components/ui/sheet";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";

type Props = {
  mainText: string;
};

export default function Header({ mainText }: Props) {
  return (
    <div>
      <div className=" w-full flex items-center justify-between py-6">
        <h1 className={`text-3xl`}>{mainText}</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex md:hidden" variant="outline">
              <HamburgerMenuIcon className=" w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
