import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
  
    
  
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'cart') {
        return JSON.stringify([
          { productId: productId1, quantity: 2, deliveryOptionId: '1' },
          { productId: productId2, quantity: 1, deliveryOptionId: '2' }
        ]);
      }
      return null;
    });
  
    loadFromStorage();
    renderOrderSummary();
  });

  it('displays the cart', () => {

        expect
        (document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect
        (document.querySelectorAll(`.js-product-quantity-${productId1}`)[0].innerText).toContain('Quantity: 2');
        expect
        (document.querySelectorAll(`.js-product-quantity-${productId2}`)[0].innerText).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;
        
        });

        it('removes a product', () => {
       
        
          const deleteLink = document.querySelector(`.js-delete-link-${productId1}`);
          expect(deleteLink).not.toBeNull();
          deleteLink.click();
        
          expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();
          expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
          expect(document.querySelectorAll(`.js-cart-item-container-${productId1}`).length).toEqual(0);
          expect(document.querySelectorAll(`.js-cart-item-container-${productId2}`).length).toEqual(1);
          expect(cart.length).toEqual(1);
          expect(cart[0].productId).toEqual(productId2);

          document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
          `;
        });
        
});