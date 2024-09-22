import React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
const Profile = () => {
  return (
    <Card className="max-w-[350px] mx-auto flex flex-col  gap-3  p-10 justify-center align-middle mt-32">
      <h2 className="flex justify-center text-[26px] font-semibold  ">
        Profile SetUp
      </h2>
      <div className="flex justify-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Input type="text" placeholder="Name" />
      <div className="grid gap-2">
        <Select>
          <SelectTrigger className="w-[270px]">
            <SelectValue placeholder="Job Prefrence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">software developer</SelectItem>
            <SelectItem value="dark">Tester</SelectItem>
            <SelectItem value="system">Designer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid">
        <Select>
          <SelectTrigger className="w-[270px]">
            <SelectValue placeholder="Job status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">currently working</SelectItem>
            <SelectItem value="dark">fresher</SelectItem>
            <SelectItem value="system">Wroking but seeking job</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select>
          <SelectTrigger className="w-[270px]">
            <SelectValue placeholder="job sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Tech</SelectItem>
            <SelectItem value="dark">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button>Done</Button>
    </Card>
  );
};

export default Profile;
