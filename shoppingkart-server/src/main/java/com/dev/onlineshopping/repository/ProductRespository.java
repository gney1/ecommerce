package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.Product;

public interface ProductRespository extends JpaRepository<Product, Long> {

	List<Product> findByNameStartsWithIgnoreCase(String name);

	List<Product> findAllBySubCategoryId(Long id);
}
