package com.dev.onlineshopping.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "payment_details")
public class PaymentDetails {


	@Id
	@GeneratedValue
	private Long id;

	private String cardNumber;
	private String expiry;
	private String cvv;
	private String cardName;
	private String paymentType;
	private double amount;
	private String paymentStatus;
	
	public PaymentDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaymentDetails(String cardNumber, String expiry, String cvv, String cardName, String paymentType,
			double amount, String paymentStatus) {
		super();
		this.cardNumber = cardNumber;
		this.expiry = expiry;
		this.cvv = cvv;
		this.cardName = cardName;
		this.paymentType = paymentType;
		this.amount = amount;
		this.paymentStatus = paymentStatus;
	}
	public String getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	public String getExpiry() {
		return expiry;
	}
	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}
	public String getCvv() {
		return cvv;
	}
	public void setCvv(String cvv) {
		this.cvv = cvv;
	}
	public String getCardName() {
		return cardName;
	}
	public void setCardName(String cardName) {
		this.cardName = cardName;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	
	
}
