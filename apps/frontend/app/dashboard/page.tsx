"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Dashboard() {
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  async function getUrl() {

    console.log(linkedin)
    try {

      const data = await axios.post("http://localhost:3000/api/v1/pre-interview/url", {
        // linkedinUrl: linkedin,
        githubUrl: github,
      });
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md rounded-none border-2 border-black shadow-none">
        <CardHeader className="text-center border-b-2 border-black pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-black">
            Kick start interview
          </CardTitle>
          <CardDescription className="text-black/60">
            Drop your profiles and we'll take it from here
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="font-bold text-black">
              LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              type="text"
              placeholder="https://linkedin.com/in/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-black placeholder:text-black/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className="font-bold text-black">
              GitHub URL
            </Label>
            <Input
              id="github"
              type="text"
              placeholder="https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-black placeholder:text-black/40"
            />
          </div>

          <Button
            onClick={getUrl}
            className="w-full mt-2 rounded-none bg-black text-white font-bold hover:bg-black/80"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
