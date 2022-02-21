import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { getProducts, Record, Product, getPrices, Price } from './lib/airtable'

interface PricesTableProps {
  products: [Record<Product>]
  prices: [Record<Price>]
}

function PricesTable ({ products, prices }: PricesTableProps): React.ReactElement {
  return (
    <div className='m-2 bg-yellow-50 border-2 border-cyan-600 max-w-xl w-full rounded-lg p-2'>
      <div className='flex'>
        <p className='flex-1 text-center border-r'>Название</p>
        <p className='flex-1 text-center'>Цена</p>
      </div>
      {products?.map((product: Record<Product>) =>
        <div key={product.id} className='flex hover:bg-yellow-200 border-t'>
          <p className='flex-1 border-r px-2'>
            {product.fields.Name}
          </p>
          <p className='flex-1 px-2'>
            {prices?.find(price => price.id === product.fields.PricesRef[0])?.fields.Price}
          </p>
        </div>
      )}
    </div>
  )
}

function App (): React.ReactElement {
  const [products, setProducts] = useState<[Record<Product>]>()
  const [prices, setPrices] = useState<[Record<Price>]>()

  useEffect(() => {
    getProducts().then(setProducts).catch(err => console.log(err))
    getPrices().then(setPrices).catch(err => console.log(err))
  }, [])

  return (
    <div className='App flex flex-col items-center w-full'>
      <header className='bg-slate-800 flex justify-center items-center p-2 w-full'>
        <div className='relative w-10 h-10'>
          <img src={logo} className='w-10 h-10 absolute' alt='logo' />
          <img src={logo} className='w-10 h-10 animate-ping absolute' alt='logo' />
        </div>
        <h2 className='ml-4 text-white text-xl'>Curated list of good prices</h2>
      </header>
      {products === undefined || prices === undefined
        ? <img src={logo} className='w-10 h-10 animate-spin' alt='logo' />
        : <PricesTable products={products} prices={prices} />}
    </div>
  )
}

export default App
