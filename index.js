import { menuArray } from '/data.js'
let cart = []
let completeorder = []
function getmenuHtml(arr){
    
   return arr.map((item)=> {
        const{
        name,
        ingredients,
        price,
        emoji,
        id
        } = item
        return `
 <div class="menu-item">
         <h3>${emoji}</h3> 
       <div class="inner-item"> 
            <h4>${name}</h4> 
            <p>${ingredients}</p> 
            <h5>$${price}</h5> 
        </div> 
       <i class="fa-regular fa-plus" data-add="${id}"></i>  
              
 </div>  
        `
    }).join('')
}
     function renderCartContainer(){
        const cartContainer = document.getElementById('cart-container')
        if (cart.length === 0 ){
            cartContainer.innerHTML = ""
            return
        }
        const cartItemHtml = cart.map(item=>`<P>${item.name} - $${item.price}</p>`).join('')
        
        const  totalPrice = cart.reduce((sum,item)=> sum + item.price, 0)
        
        const cartHtml = `
            <div id="cart">
                <h3>Your Order</h3> 
                <div id="cart-items">${cartItemHtml}</div>
                <p>Total Price: $<span id="total-price">${totalPrice}</span></p>
                <button id="complete-btn">Complete Order</button>  
          </div> 
        `
     cartContainer.innerHTML = cartHtml
      document.getElementById('complete-btn').addEventListener('click', function(){
        const completeContainer = document.getElementById('complete-container')
        completeContainer.style.display = 'block'
        completeContainer.innerHTML = `
         <div id="form-overlay"></div>
         <form id="payment-form">
         <h1>Enter Card Details</h1>
          <input id="username" type="text" placeholder="Enter Your Name" required></input>
           <input type="number" placeholder="Enter Card Number" required></input>
            <input type="number" placeholder="Enter CVV" required></input>
            <button class="pay-btn">PAY</button> 
         </form>
        
        `
        
        
        document.getElementById('payment-form').addEventListener('submit',function(e){
            e.preventDefault()
            const name = document.getElementById('username').value
            document.getElementById("cart-container").style.display = "none"
             cart.length = 0
            completeContainer.innerHTML = `
            <div id="form-overlay"></div>
            <div class="modal-content"> 
            <button id="close-thanks" class="close-btn">X</button>
             <h2>Thanks, ${name}! Your Order is on its way!</h2> 
            </div>
     
            `
           document.getElementById("close-thanks").addEventListener("click",function(){
            completeContainer.style.display ="none"
           })
        })
     })
}
document.addEventListener('click', function(e){
    if(e.target.matches("[data-add]")){
        const itemId = parseInt(e.target.dataset.add)
        const item = menuArray.find(item => item.id === itemId)
        cart.push(item)
       renderCartContainer()
    }
})
 document.getElementById("container").innerHTML = getmenuHtml(menuArray)