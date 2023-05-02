package com.dev.onlineshopping.requestresponse;

import java.util.List;

import com.dev.onlineshopping.model.CartItem;

public class CartItemResponse {
	private List<CartItem> cartItems;
	private int totalQuantity;
	private double totalCost;
	public List<CartItem> getCartItems() {
		return cartItems;
	}
	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}
	public int getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(int totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public double getTotalCost() {
		return totalCost;
	}
	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}
	
	
}
