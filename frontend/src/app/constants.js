export const ITEMS_PER_PAGE = 10;
export function discountedPrice(item){
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}
// export function discountedPrice(item) {
//     // Check if item.product exists before accessing its properties
//     if (item.product && typeof item.product === 'object' && 'price' in item.product && 'discountPercentage' in item.product) {
//       return Math.round(item.product.price * (1 - item.product.discountPercentage / 100), 2);
//     } else {
//       // Handle the case where item.product is missing or invalid
//       return 0; // or any default value
//     }
//   }