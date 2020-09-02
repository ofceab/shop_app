const fs=require('fs');
const path=require('path');
const rootDir=require('../helpers/path');
/**
 * Cart will hold all the data of a shop
 * a Cart has 
 * 
 * list of product, each one contains 
 * the product id and the quanty and the price for optimisation purpose
 * 
 * totalPrice
 */

const cartsource=path.join(rootDir, 'models','datasource','cart.json');

const ct={
    products:[
        {productId: 1, price:25, quantity},
    ],
    totalPrice:0
}


//Step to build the cart
// Get the cart
// Add the new item
// Update the final price
const cart=class Cart{
        /**
         * This method is to add a product to the cart
         * @param productData is an object
         * {productId: 1, price:25, quantity}
         */
        addProductToCart(productData){
            getCart((cart)=>{
                const productItem=cart.products.find(prod=>prod.productId==productData.productId);
                if(productItem!==undefined){
                    //Here the products existe
                    const productIndex=cart.products.findIndex(prod=>prod.productId==productData.productId)

                    //Update the product data
                    cart.products[productIndex]=productData;
                }
                else{
                    cart.products.push(productData);
                }

                //Update totalPrice
               const total=getTotalPrice(cart.products);
               cart.totalPrice=total;

               //Now save the cart in the file
               fs.writeFileSync(cartsource,JSON.stringify(cart));
               
            });
        }


        /**
         * This method is to get the total amount of the cart
         */
        static getTotalPrice(products){
            const total=products.reduce((prevProd,nexProd)=>(prevProd.price*prevProd.quantity)+(nexProd.price*nexProd.quantity));
            return parseInt(total);
        }

        /**
         * Get the item of the item of the cart
         * {productId: 1, price:25, quantity},
         */
        static getCart(cb){
            fs.readFile(cartsource,(error,data)=>{
                if(!error){
                    //So the file exist
                    cb(JSON.parse(data));
                }
                else{
                    //First creation of the file
                    const initialCart={
                        products:[
                            
                        ],
                        totalPrice:0
                    };
                    try{
                        fs.writeFile(cartsource,JSON.stringify(initialCart),cb(initialCart));
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                }
            })
        }
}



//Exportation
module.exports=cart;