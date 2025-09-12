const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(!currentUser || currentUser.role!=='admin') {
    alert('Hanya admin yang bisa mengakses halaman ini!');
    window.location.href='index.html';
}

let menuData = JSON.parse(localStorage.getItem('menuData')) || [];

const menuList = document.getElementById('menuList');

function renderMenu() {
    menuList.innerHTML = '';
    menuData.forEach((item,index)=>{
        const div = document.createElement('div');
        div.className="bg-white p-3 rounded shadow";
        div.innerHTML=`
            <img src="${item.img}" class="w-full aspect-square rounded">
            <p class="font-bold mt-2">${item.name}</p>
            <p>Rp. ${item.price.toLocaleString()}</p>
            <p>Type: ${item.type}</p>
            <div class="flex gap-2 mt-2">
                <button onclick="editMenu(${index})" class="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                <button onclick="deleteMenu(${index})" class="bg-red-500 px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
        `;
        menuList.appendChild(div);
    });
    localStorage.setItem('menuData',JSON.stringify(menuData));
}

document.getElementById('addMenuForm').addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('menuName').value;
    const price=parseInt(document.getElementById('menuPrice').value);
    const type=document.getElementById('menuType').value;
    const img=document.getElementById('menuImg').value;

    menuData.push({name,price,type,img});
    renderMenu();
    e.target.reset();
});

function editMenu(index){
    const item = menuData[index];
    const newName = prompt('Nama Menu:',item.name);
    const newPrice = prompt('Harga:',item.price);
    const newType = prompt('Type (food/drink):',item.type);
    const newImg = prompt('URL Gambar:',item.img);
    if(newName) item.name=newName;
    if(newPrice) item.price=parseInt(newPrice);
    if(newType) item.type=newType;
    if(newImg) item.img=newImg;
    renderMenu();
}

function deleteMenu(index){
    if(confirm('Hapus menu ini?')) {
        menuData.splice(index,1);
        renderMenu();
    }
}

function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='index.html';
}

renderMenu();
