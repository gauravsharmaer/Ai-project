import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Login = () => {
  return (
    <div>
      <Card className="max-w-[350px] mx-auto flex flex-col  gap-3  p-10 justify-center align-middle mt-32">
        <h2 className="flex justify-center text-[26px] font-semibold  ">
          Login
        </h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </Card>
    </div>
  );
};

export default Login;
