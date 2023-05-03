package com.dev.onlineshopping.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.onlineshopping.model.CartItem;
import com.dev.onlineshopping.model.Customer;
import com.dev.onlineshopping.model.CustomerAddress;
import com.dev.onlineshopping.model.Order;
import com.dev.onlineshopping.model.OrderItem;
import com.dev.onlineshopping.model.PaymentDetails;
import com.dev.onlineshopping.repository.CartItemRepository;
import com.dev.onlineshopping.repository.CustomerAddressRepository;
import com.dev.onlineshopping.repository.CustomerRepository;
import com.dev.onlineshopping.repository.OrderRepository;
import com.dev.onlineshopping.requestresponse.OrderRequest;
import com.dev.onlineshopping.util.RandomString;

@RestController
@RequestMapping("/api")
public class OrderController {

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	CartItemRepository cartItemRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	CustomerAddressRepository addressRepository;

	@PostMapping("/order")
	Order addOrder(@RequestBody OrderRequest request){
		List<CartItem> cartItems = cartItemRepository.getByUserId(request.getUserId());
		Customer customer = customerRepository.getByUserId(request.getUserId());
		List<CustomerAddress> customerAdd = addressRepository.getByCustomer(customer);
		PaymentDetails details = new PaymentDetails(request.getCardNumber(), request.getExpiry(), request.getCvv(), request.getCardName(), request.getPaymentType(), request.getAmount(), "COMPLETED");
		Order order = new Order(null, request.getAmount(), "PENDING", new Date(), null, details, request.getUserId(), null);
		orderRepository.save(order);
		Set<OrderItem> orderItems = new HashSet<OrderItem>();
		for (CartItem item : cartItems) {
			OrderItem item2 = new OrderItem(item.getProduct(), item.getQuantity(),order);
			orderItems.add(item2);
		}
		if(null!= customerAdd && customerAdd.size()>0) {			
			order.setAddress(customerAdd.get(0));
		}
		order.setOrderNumber(new RandomString(8).nextString());
		order.setOrderItems(orderItems);
		order.setOrderBy(customer.getFirstName()+" "+customer.getLastName());
		cartItemRepository.deleteAll(cartItems);
		order = orderRepository.save(order);
		order.setOrderItems(null);
		return order;
		
	}

	@GetMapping("/orders/all")
	List<Order> getAllOrders() {
		List<Order> orders = orderRepository.findAllByOrderByOrderedDateDesc();
		for (Order order : orders) {
			order.setOrderItems(null);
		} 
		return orders;
	}

	@GetMapping("/orders/{userId}")
	List<Order> getAllOrders(@PathVariable(value = "userId") Long userId) {
		Customer cust = new Customer();
		cust.setUserId(userId);
		return orderRepository.findAllByUserId(userId);

	}

}
