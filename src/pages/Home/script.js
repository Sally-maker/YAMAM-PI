function verifyPermissons(){
    const role = localStorage.getItem("role")
    const linkProducts = document.querySelector("#link_products")
    console.log(role)
    if(role =='STOCKIST'){
        linkProducts.style.display = 'none'
      
    }   
}