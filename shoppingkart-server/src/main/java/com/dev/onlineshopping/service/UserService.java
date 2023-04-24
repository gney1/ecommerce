package com.dev.onlineshopping.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dev.onlineshopping.model.Category;
import com.dev.onlineshopping.model.SubCategory;
import com.dev.onlineshopping.model.User;
import com.dev.onlineshopping.repository.CategoryRepository;
import com.dev.onlineshopping.repository.SubCategoryRepository;
import com.dev.onlineshopping.repository.UserRepository;

@Component
public class UserService {

	@Autowired
	UserRepository repository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	SubCategoryRepository subCategoryRepository;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@PostConstruct
	public void init() {
		Optional<User> user = repository.findByRole("ADMIN");
		if(!user.isPresent()) {
			User adminUser = new User("Admin", "admin", passwordEncoder.encode("admin"),new Date());
			adminUser.setRole("ADMIN");
			repository.save(adminUser);
		}
		List<Category> categories = categoryRepository.findAll();
		if(null == categories || categories.size()==0) {
			Category category = new Category(null, "Clothing", true);
			categoryRepository.save(category);
			SubCategory subCategory = new SubCategory(null, category.getId(), "Mens Clothing", true);
			SubCategory subCategory1 = new SubCategory(null, category.getId(), "Womens Clothing", true);
			SubCategory subCategory2 = new SubCategory(null, category.getId(), "Kids Clothing", true);
			subCategoryRepository.saveAll(Arrays.asList(subCategory,subCategory1,subCategory2));
			
			category = new Category(null, "Electronics", true);
			categoryRepository.save(category);
			subCategory = new SubCategory(null, category.getId(), "Mobile Phones", true);
			subCategory1 = new SubCategory(null, category.getId(), "Computers & Laptops", true);
			subCategoryRepository.saveAll(Arrays.asList(subCategory,subCategory1));

			category = new Category(null, "Home & Kitchen", true);
			categoryRepository.save(category);
			subCategory = new SubCategory(null, category.getId(), "Furniture", true);
			subCategory1 = new SubCategory(null, category.getId(), "Kitchen Appliances", true);
			subCategoryRepository.saveAll(Arrays.asList(subCategory,subCategory1));
		}
	}
}
