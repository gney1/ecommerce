package com.dev.onlineshopping.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.onlineshopping.model.Customer;
import com.dev.onlineshopping.model.CustomerAddress;
import com.dev.onlineshopping.repository.CustomerAddressRepository;
import com.dev.onlineshopping.repository.CustomerRepository;
import com.dev.onlineshopping.requestresponse.CustomerAddressRequest;
import com.dev.onlineshopping.requestresponse.CustomerRequest;

@RestController
@RequestMapping("/api")
public class CustomerController {

	@Autowired CustomerRepository customerRepository;

	@Autowired CustomerAddressRepository customerAddressRepository;

	@GetMapping("/customers")
	List<Customer> getAllCustomers(){
		return customerRepository.findAll();
	}

	@PostMapping("/customer")
	Customer saveCustomer(@RequestBody CustomerRequest request) {
		Customer customer = new Customer(request.getUserId(),request.getFirstName(), request.getLastName(),
				request.getContactNumber(), request.getEmailAddress(), request.getGender(), new Date());
		return customerRepository.save(customer);
	}

	@PutMapping("/customer")
	Customer updateCustomer(@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}

	@PostMapping("/address")
	CustomerAddress saveAddress(@RequestBody CustomerAddressRequest request) {
		Customer customer = new Customer();
		customer.setId(request.getCustomerId());
		CustomerAddress address = new CustomerAddress(request.getAddressLine1(), request.getAddressLine2(), request.getCounty(), request.getState(),
				request.getCountry(), request.getZipCode(), customer);
		return customerAddressRepository.save(address);
	}
}
