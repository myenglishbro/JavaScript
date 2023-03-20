const productos = document.getElementById("productos")

const articulos=['item1','item2','item3']

const fragmento=document.createDocumentFragment()

articulos.forEach((item)=>{
const li=document.createElement("li")
li.textContent=item

const childNode=fragmento.firstChild

fragmento.insertBefore(li,childNode)
console.log(item,childNode)


}
)

productos.appendChild(fragmento)