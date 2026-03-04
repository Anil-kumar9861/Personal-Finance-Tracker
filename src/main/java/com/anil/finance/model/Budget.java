package com.anil.finance.model;

import javax.persistence.*;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private Double monthlyLimit;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(Double monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
