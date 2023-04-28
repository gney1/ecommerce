package com.dev.onlineshopping.requestresponse;

public class ProductRequest {

	public String productCode;
	public String productName;
	public String categoryName;
	public Long categoryId;
	public String subCategoryName;
	public Long subCategoryId;
	public double price;
	private String brand;
	private int stock;
	private String image;
	private String description;
	private boolean active;

	public ProductRequest() {
		super();
	}

	public ProductRequest(String productCode, String name, String category, Long categoryId, String subCategory,
			Long subCategoryId, double price, String brand, int stock, String description, boolean active) {
		super();
		this.productCode = productCode;
		this.productName = name;
		this.categoryName = category;
		this.categoryId = categoryId;
		this.subCategoryName = subCategory;
		this.subCategoryId = subCategoryId;
		this.price = price;
		this.brand = brand;
		this.stock = stock;
		this.description = description;
		this.active = active;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public Long getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

}
