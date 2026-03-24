function Loading(){
    return(
        <div className="fixed inset-0 z-20 bg-black/50 backdrop-blur-xs flex justify-center items-center">
            <div className="w-14 h-14 rounded-full border-8 border-white border-dashed spin"></div>
        </div>
    )
}

export default Loading;