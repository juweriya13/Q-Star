import React from 'react'

function Impressions({impressions}) {
  return (
    <div className="w-full  p-2 text-center border-2 border-zinc-800 rounded-lg">
      <h1 className="text-purple-400 font-medium">Impressions</h1>
      
        <h1 className="text-sm">{impressions}</h1>
    </div>
  )
}

export default Impressions