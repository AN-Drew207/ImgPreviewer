import React, {useState, useEffect} from 'react' 

const MultipleImageUploadComponent=()=>{
    const[imgsRender, setImgsRender] = useState([])
    const [files, setFiles] = useState([])

    const uploadImgs=(e)=>{
        let preRenderFiles=[]
        let imgs=[]
        preRenderFiles.push(e.target.files)
        console.log(e.target.files)
        setFiles(e.target.files)
        for (let i = 0; i < preRenderFiles[0].length; i++) {
            imgs.push({url:URL.createObjectURL(preRenderFiles[0][i]),id:i})
        }
        setImgsRender(imgs)
    }

    const deleteImg=(img, index)=>{
        console.log(img.id)
        let preRenderFiles=[]
        setImgsRender((prev)=>{
            return prev.filter(prevImg=>{
                return prevImg.id!==img.id
            })
        })
        for(let i=0;i<files.length;i++){
            if(i!==index){
                preRenderFiles.push(files[i])
            }
        }
        setFiles(preRenderFiles)
    }

    const uploadFiles=(e)=>{
        e.preventDefault();
        console.log(imgsRender)
    }

    return(
        <div className="w-full flex items-center justify-center">      
            <form className="w-full mx-4 p-4 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <div className="w-5/6 flex items-start flex-col bg-white justify-start m-5">
                    <div className="w-full grid grid-cols-5 gap-3 items-center  min-h-1/2screen">
                        {
                            imgsRender.map((img,index)=>{
                                return(
                                    <div key={index} className="img-container h-28 w-auto">
                                        <div 
                                            onClick={()=>deleteImg(img, index)}
                                            className="delete"
                                        >
                                                X
                                        </div>
                                        <img className="h-auto w-auto" src={img.url} alt={index}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <label className="w-full flex flex-row items-center">
                        <input id="files" className="hidden" type="file" files={files} onChange={uploadImgs} multiple/>
                        <p className="p-2 m-2 bg-gray-300 rounded-sm active:bg-gray-400 "> Subir Archivo </p>
                        {
                            files.length ?
                                files.length === 1 ?
                                <p>{files.length} Archivo Subido</p> 
                                :
                                <p>{files.length} Archivos Subidos</p> 
                            :
                            <p className="">No se ha subido ningun archivo</p> 
                            
                        }
                    </label>
                </div>
                <button onClick={uploadFiles} className="w-5/6 bg-red-500 m-5 rounded-sm">Upload</button>
            </form>
        </div>
    )
}
export default MultipleImageUploadComponent