import { CartResponse, OrderResponse, Product,URLResponse } from "@/types";

// api adresi
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const userId = process.env.NEXT_PUBLIC_USER_ID;

// sepete ürün ekle
export const addToBasket = async (groceryId: string, quantity: number) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ groceryId, quantity, userId }),
  });

  return res.json();
};

// bir ürünü satın alma
export const checkoutSingleItem = async ( grocery:Product, quantity:number):URLResponse => {
  const body = {
    grocery:grocery._id,
    quantity,
    customerInfo: {
      userId,
      name:"Alperen Uzun",
      phone:"555 666 77 88",
      deliveryAddress:"Muğla 134sk no:75 d:15",
      isDelivery:true,
    }
  }

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method:"POST",
    body:JSON.stringify(body),
    headers: {"Content-Type": "application/json"},
  })

  return res.json()
}

// sepetteki ürünleri al
export const getBasket = async ():CartResponse => {
  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`)
  return res.json();
};

// sepetteki ürün miktarını güncelle
 export const updateQuantity = async (groceryId:string, newQuantity:number) => {
  const res  = await fetch(`${BASE_URL}/api/cart/item`, {
    method:"PUT",
    body:JSON.stringify({userId, groceryId, quantity:newQuantity}),
    headers: {"Content-Type": "application/json"},
  })

  return res.json()
}

// sepeti temizle
export const removeFromBasket = async (groceryId: string) => {
  const res = await fetch(`${BASE_URL}/api/cart/item?userId=${userId}&groceryId=${groceryId}`,
    {
      method: "DELETE"
    }
  )

  return res.json()
}

// sepeti temizle
export const clearBasket = async () => {
  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`,{
    method:"DELETE"
  })

  return res.json()
}

// sepetteki bütün ürünler için satın alım urli oluşturucak
export const checkoutBasket = async ():URLResponse => {
  const body = {
    userId,
    customerInfo: {
     userId,
     name:"Alperen Uzun",
     phone: "555 666 77 88",
     deliveryAddress: "Mugla, Türkiye 163sk. no:18",
     isDelivery: true
    }
  }

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body:JSON.stringify(body),
    headers:{"Content-Type": "application/json"},
  })

  return res.json()
}

// siparişlerimi getir
export const getOrders = async (): OrderResponse => {
  const res = await fetch(`${BASE_URL}/api/orders?customer_id=${userId}`);

  return res.json();
};