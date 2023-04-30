package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

	List<SubCategory> findByCategoryId(Long id);

}
