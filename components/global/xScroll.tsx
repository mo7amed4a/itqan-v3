import React from 'react'

export default function XScroll({
    children
}:{
    children: React.ReactNode
}) {
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 hidden-scrollbar space-x-4 my10">
        {children}
    </div>
  )
}
