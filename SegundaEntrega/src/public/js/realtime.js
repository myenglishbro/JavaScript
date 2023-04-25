const socket = io();
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