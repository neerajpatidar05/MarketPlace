import { LazyLoadImage } from 'react-lazy-load-image-component'

const NFTCard = (props) => {
  const { data } = props
  return (
    <div className="min-w-245 max-w-215 xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-245 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md hover:shadow-lg duration-500">
      <div className="relative w-215 h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <>
          <LazyLoadImage
            style={{ width: '300px' }}
            className="flex object-fill justify-center w-full items-center minmd:min-w-190 hover:scale-110 transition-all duration-500"
            alt="nobbbbbbbbbbbbbbbbbbbbbbbbb"
            placeholderSrc="img"
            src='${data}'
          />
        </>
      </div>
      <div className="mt-3 flex flex-col " style={{ color: 'black' }}>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          Name: {data.name}
        </p>
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            Price: {data.price || 500}
            <span className="normal">ETH</span>
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-lg">
            NFT Name : <span className="normal"> nft</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
