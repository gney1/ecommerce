package com.dev.onlineshopping.requestresponse;

public class CartItemRequest {

	private Long userId;

	private Long productId;

	private int quantity;

	public CartItemRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItemRequest(Long userId, Long productId, int quantity) {
		super();
		this.userId = userId;
		this.productId = productId;
		this.quantity = quantity;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
