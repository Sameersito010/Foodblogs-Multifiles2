let cl=console.log;



const recipeForm=document.getElementById("recipeForm");
const RecipeTitleControl=document.getElementById("RecipeTitle");
const recipeDetailsControl=document.getElementById("recipeDetails");
const recipeThumbImgControl=document.getElementById("recipeThumbImg");
const recipeBannerImgControl=document.getElementById("recipeBannerImg");

const baseUrl=`https://batch-10-crud-post-default-rtdb.asia-southeast1.firebasedatabase.app/`;
const foodBlogUrl=`${baseUrl}/foodblog.json`;


const fileUploader=(inputfileControl)=>{
    return new Promise((resolve,reject)=>{
        let selectedFile=inputfileControl.files[0];
        cl(selectedFile)

        if(selectedFile){
            let reader=new FileReader()
            reader.onload=function(e){
                cl(e.target.result)
                let imgObj={
                    fileName:selectedFile.name,
                    fileType:selectedFile.type,
                    dileSize:selectedFile.size,
                    uploadTime:Date.now(),
                    fileBase64:e.target.result
                }
            }
            reader.readAsDataURL(selectedFile)
        }else{
            reject(`wrong`)
        }
    })
}


makeApiCall=async(apiUrl,methodName,msgBody=null)=>{
 let res=await fetch(apiurl,{
    method:methodName,
    body:msg
})
return res.json()
}


const onBlogcreate=async(eve)=>{
eve.preventDefault()
  let thumImgInfo =await fileUploader(recipeThumbImgControl);
  let bannerImgInfo=await fileUploader(recipeBannerImgControl);

  let foodBlogPost={
    RecipeTitle:RecipeTitle.value,
    recipeDetails:recipeDetails.value,
    recipeThumbImg:thumImgInfo,
    recipeBannerImg:bannerImgInfo,
  }
  cl(foodBlogPost)
  
let resp=await makeApiCall(foodBlogUrl,"POST",JSON.stringify(foodBlogPost))
cl(resp);

}




recipeForm.addEventListener("submit",onBlogcreate)



// const onThumbImgChange=async(eve)=>{
//     // cl(eve.target.files)
//     let res=await fileUploader(eve.target)
//     // .then(res=>{
//     //     cl(res);
//     // })

// }
             

// recipeThumbImgControl.addEventListener("change",onThumbImgChange)
//(In above funtion we have to do this functionality on submit of form so bind event on recipe Form )