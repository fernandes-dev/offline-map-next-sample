import dynamic from 'next/dynamic'

function DynamicMap() {
  const DynamicComponentWithNoSSR = dynamic(
    () => import('./Map'),
    {ssr: false}
  )
  return (
    <DynamicComponentWithNoSSR />
  )
}

export default DynamicMap
