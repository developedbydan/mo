"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  // const [isLoading, setIsLoading] = useState(false);
  // const formRef = useRef<HTMLFormElement>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const data = {
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     message: formData.get("message"),
  //   };

  //   try {
  //     const response = await fetch("/api/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || "Failed to send message");
  //     }

  //     toast("Message sent successfully!");
  //     formRef.current?.reset();
  //   } catch (error) {
  //     toast("Failed to send message. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h1 className="text-center text-4xl font-semibold lg:text-5xl">
          Contact Me
        </h1>
        <p className="mt-4 text-center">
          I'm always looking for new opportunities and collaborations.
        </p>

        <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
          <form
            // ref={formRef}
            // onSubmit={handleSubmit}
            className="**:[&>label]:block space-y-6 *:space-y-3"
          >
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input type="text" id="name" name="name" required />
            </div>

            <div>
              <Label htmlFor="email">Work Email</Label>
              <Input type="email" id="email" name="email" required />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={3} required />
            </div>

            {/* <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Submit"}
            </Button> */}
            <Button>Send Message</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
