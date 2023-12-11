const LoadingSpinner = () => {
  return (
    <div className="h-full w-full flex justify-center">
        <div className="w-32 h-32 border-t-4 border-l-4 border-purple-opacity border-solid rounded-full animate-spin mt-60">
            <div className="absolute w-full h-full border-t-4 border-l-4 border-orange-opacity border-solid rounded-full animate-spin"/>
        </div>
    </div>
  )
}

export default LoadingSpinner