import { useEffect } from 'react'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const crssPriceBusd = useCakeBusdPrice()
  useEffect(() => {
    const crssPriceBusdString = crssPriceBusd ? crssPriceBusd.toFixed(2) : ''
    document.title = `Pancake Swap - ${crssPriceBusdString}`
  }, [crssPriceBusd])
}
export default useGetDocumentTitlePrice
