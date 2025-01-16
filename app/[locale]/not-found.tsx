import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <section className="flex items-center justify-center h-screen p-16">
      <div className="container flex flex-col items-center justify-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-primary">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl text-gray-500">
            Sorry, we couldn&apos;t find this page.
          </p>
          <Button as={Link}
            href="/"
            color="primary"
            className="hover:bg-secondary hover:text-white"
          >
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
