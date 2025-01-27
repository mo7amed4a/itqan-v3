'use client'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function InputSearch({placeholder, bg=false} : {
    placeholder: string,
    bg?:boolean
}) {
  const [search, setSearch] = useState<string | null>(null)
  const router = useRouter()
  const {locale:lng} = useParams()
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      router.push(lng ==="ar" || !lng ? `/search?name=${search}` : `/${lng}/search?name=${search}`)
    }
  }
  return (
    <form onSubmit={handelSubmit} dir="rt" className={`relative w-full max-w-sm ${bg && "bg-white text-black rounded-md !overflow-hidden"}`}>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full ps-10 pe-4 py-2 border h-9 border-input hover:border-white focus:border-white bg-transparent text-white focus:ring-transparent focus:outline-transparent  placeholder:!text-white 
          ${bg && "bg-white text-black placeholder:!text-gray-600"} `}
      />
      <button type="submit" className={`cursor-pointer absolute inset-y-0 start-0 flex items-center ps-3 text-white ${bg && "!text-gray-600"}`}>
        <Search className="h-4 w-4 text-current" aria-hidden="true" />
      </button>
    </form>
  )
}

