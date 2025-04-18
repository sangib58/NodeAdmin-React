import { RotatingLines } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50">
        <div className="min-h-screen flex justify-center items-center">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeColor='#424242'
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    </div>
  )
}

export default Spinner