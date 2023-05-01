package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.CartItem;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	List<CartItem> getByUserId(Long userId);

	List<CartItem> findAllByUserId(Long userId);


}
