package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	List<Customer> findByUserId(Long userId);

	Customer getByUserId(Long userId);
}
