package com.anil.finance.controller;

import com.anil.finance.model.Budget;
import com.anil.finance.model.User;
import com.anil.finance.repository.BudgetRepository;
import com.anil.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{email}")
    public Budget addBudget(@PathVariable String email, @RequestBody Budget budget) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        budget.setUser(user);
        return budgetRepository.save(budget);
    }

    @GetMapping("/{email}")
    public List<Budget> getBudgets(@PathVariable String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return budgetRepository.findByUser(user);
    }
}