exports.uploadEditorImage = async(req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            })
        }
        const url = `${process.env.BASE_URL}/uploads/posts/${req.file.filename}`;
        res.json({
            success: true,
            url,
            message: "Image uploaded successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}