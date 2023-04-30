package com.dev.onlineshopping.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "subcategory")
public class SubCategory {

	@Id
	@GeneratedValue
	private Long id;
	private Long categoryId;
	private String name;
	private boolean active;

	public SubCategory(Long id, Long categoryId, String name, boolean active) {
		super();
		this.id = id;
		this.categoryId = categoryId;
		this.name = name;
		this.active = active;
	}

	public SubCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
