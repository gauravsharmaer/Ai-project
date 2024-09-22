import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const Interview = () => {
  return (
    <div>
      <Card className="max-w-[800px] mx-auto flex flex-col  gap-3  p-10 justify-center align-middle mt-32">
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <Textarea
          placeholder="Type your job description here."
          className="my-2"
        />
        <div className="flex gap-3">
          <Button>End Call</Button>
          <Button>Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default Interview;
