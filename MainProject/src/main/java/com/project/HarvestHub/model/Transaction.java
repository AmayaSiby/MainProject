package com.project.HarvestHub.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Transaction {
    
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String consumerEmail;
	    private String farmerEmail;
	    private String transactionId;

	    @Enumerated(EnumType.STRING)  // Ensures it stores as 'ONLINE' instead of ordinal (0,1)
	    private PaymentType paymentType;

	    @Temporal(TemporalType.TIMESTAMP)
	    private Date transactionDate;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getConsumerEmail() {
			return consumerEmail;
		}

		public void setConsumerEmail(String consumerEmail) {
			this.consumerEmail = consumerEmail;
		}

		public String getFarmerEmail() {
			return farmerEmail;
		}

		public void setFarmerEmail(String farmerEmail) {
			this.farmerEmail = farmerEmail;
		}

		public String getTransactionId() {
			return transactionId;
		}

		public void setTransactionId(String transactionId) {
			this.transactionId = transactionId;
		}

		public PaymentType getPaymentType() {
			return paymentType;
		}

		public void setPaymentType(PaymentType paymentType) {
			this.paymentType = paymentType;
		}

		public Date getTransactionDate() {
			return transactionDate;
		}

		public void setTransactionDate(Date transactionDate) {
			this.transactionDate = transactionDate;
		}

		@Override
		public String toString() {
			return "Transaction [id=" + id + ", consumerEmail=" + consumerEmail + ", farmerEmail=" + farmerEmail
					+ ", transactionId=" + transactionId + ", paymentType=" + paymentType + ", transactionDate="
					+ transactionDate + "]";
		}

		public Transaction(Long id, String consumerEmail, String farmerEmail, String transactionId,
				PaymentType paymentType, Date transactionDate) {
			super();
			this.id = id;
			this.consumerEmail = consumerEmail;
			this.farmerEmail = farmerEmail;
			this.transactionId = transactionId;
			this.paymentType = paymentType;
			this.transactionDate = transactionDate;
		}

		public Transaction() {
			super();
			// TODO Auto-generated constructor stub
		}

	    
}
