package com.dev.onlineshopping.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.onlineshopping.model.Product;
import com.dev.onlineshopping.repository.ProductRespository;
import com.dev.onlineshopping.requestresponse.ProductRequest;

@RestController
@RequestMapping("/api")
public class ProductController {
	
	@Autowired ProductRespository productRespository;
	
	@GetMapping("/product/all")
	List<Product> getAllProducts(){
		return productRespository.findAll();
		
	}
	@GetMapping("/product/subcategory/{id}")
	List<Product> getAllProducts(@PathVariable(value = "id") Long id){
		return productRespository.findAllBySubCategoryId(id);
		
	}
	@GetMapping("/product/{id}")
	Optional<Product> getProduct(@PathVariable(value = "id") Long id){
		return productRespository.findById(id);
		
	}
	
	@PostMapping("/product")
	Product addProduct(@RequestBody ProductRequest productRequest){
		Product product = new Product(null, productRequest.getProductCode(), productRequest.getProductName(), productRequest.getDescription(),
				productRequest.getCategoryName(),productRequest.getCategoryId(), productRequest.getSubCategoryName(),productRequest.getSubCategoryId(),
			productRequest.getPrice(), productRequest.getBrand(), productRequest.getStock(), productRequest.getImage(), true);
		product.setCreatedDate(new Date());
		product.setUpdatedDate(new Date());
		return productRespository.save(product);
		
	}
	
	@PutMapping("/product")
	Product updateProduct(@RequestBody Product product){
		return productRespository.save(product);
		
	}

}
