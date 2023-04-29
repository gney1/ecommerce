package com.dev.onlineshopping.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
