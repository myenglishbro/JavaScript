const socket = io();

let form=document.getElementById("formProduct")

form.addEventListener('submit',evt=>{
  evt.preventDefault()
  let title=form.elements.title.value
  let description=form.elements.description.value

  let stock=form.elements.title.value

  let thumbnail=form.elements.title.value

  let price=form.elements.title.value
  let code=form.elements.title.value

  console.log(title)
  socket.emit('addProduct',{
    title,description,stock,thumbnail,price,code
  })
  form.reset()
})


document.getElementById("delete-btn").addEventListener("click",function(){
  console.log("borrando")
  const deleteidinput=document.getElementById("id-prod")
  const deleteid=parseInt(deleteidinput.value);
  socket.emit("deleteProduct",deleteid);
  deleteidinput.value="";
})






socket.on('productos',data=>{
  console.log(data)

  let div=document.getElementById('list-products')
  let productos=""
  data.forEach((product)=>{
     productos += `<div class="card" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">${product.price}</p>
        </div>
      </div>`
  })
  div.innerHTML=productos
});