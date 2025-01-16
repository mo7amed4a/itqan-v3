"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
}

export function ImageModal({ src, alt }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="cursor-pointer w-full h-full" onClick={() => setIsOpen(true)}>
        {src && <Image
          src={src}
          width={2500}
          height={2500}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-300"
        />}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
          <div className="max-w-4xl w-full h-[80vh] p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              width={2500}
              height={2500}
              alt={alt}
              onClick={() => setIsOpen(e => !e)}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
