package com.dev.onlineshopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.onlineshopping.model.Customer;
import com.dev.onlineshopping.model.CustomerAddress;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Long> {

	List<CustomerAddress> getByCustomer(Customer customer);

}
