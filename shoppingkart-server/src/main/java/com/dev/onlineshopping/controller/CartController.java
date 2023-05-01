package com.dev.onlineshopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.onlineshopping.model.CartItem;
import com.dev.onlineshopping.model.Product;
import com.dev.onlineshopping.repository.CartItemRepository;
import com.dev.onlineshopping.requestresponse.CartItemRequest;
import com.dev.onlineshopping.requestresponse.CartItemResponse;

@RestController
@RequestMapping("/api")
public class CartController {

	@Autowired CartItemRepository cartItemRepository;
	
	@PostMapping("/cart")
	CartItem addOrder(@RequestBody CartItemRequest request){
		CartItem cartItem = new CartItem();
		cartItem.setQuantity(request.getQuantity());
		Product product = new Product();
		product.setId(request.getProductId());
		cartItem.setProduct(product);
		cartItem.setUserId(request.getUserId());
		return cartItemRepository.save(cartItem);
		
	}

	@GetMapping("/cartitems/all/{id}")
	CartItemResponse getAll(@PathVariable(value = "id") Long id) {
		CartItemResponse response = new CartItemResponse();
		response.setCartItems(cartItemRepository.getByUserId(id));
		int total = response.getCartItems().stream().map(x->x.getQuantity()).reduce(0, Integer::sum);
		response.setTotalQuantity(total);
		double cost = response.getCartItems().stream().map(x->x.getProduct().getPrice()).reduce(0.0, Double::sum);
		response.setTotalCost(cost);
		return response;

	}
	
	@DeleteMapping("/cartitem/{userId}/{id}")
	List<CartItem> deletCartItem(@PathVariable(value = "userId") Long userId,@PathVariable(value = "id") Long id) {
		cartItemRepository.deleteById(id);
		return cartItemRepository.getByUserId(userId);

	}
	
}
