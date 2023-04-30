package com.dev.onlineshopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.onlineshopping.model.SubCategory;
import com.dev.onlineshopping.repository.SubCategoryRepository;

@RestController
@RequestMapping("/api")
public class SubCategoryController {

	@Autowired
	SubCategoryRepository subCategoryRepository;

	@GetMapping("/subcategory/all")
	List<SubCategory> getAll() {
		return subCategoryRepository.findAll();

	}

	@GetMapping("/subcategory/all/{id}")
	List<SubCategory> getAllByCategory(@PathVariable(value = "id") Long id) {
		return subCategoryRepository.findByCategoryId(id);
		
	}

}
