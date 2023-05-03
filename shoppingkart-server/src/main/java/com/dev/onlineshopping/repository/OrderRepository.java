package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findAllByUserId(Long id);

	List<Order> findAllByOrderByOrderedDateDesc();

}
