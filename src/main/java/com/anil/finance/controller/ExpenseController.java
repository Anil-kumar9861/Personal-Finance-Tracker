package com.anil.finance.controller;

import com.anil.finance.model.Expense;
import com.anil.finance.model.User;
import com.anil.finance.repository.ExpenseRepository;
import com.anil.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/expenses/{email}")
    public Expense addExpense(@PathVariable String email,
                              @RequestBody Expense expense) {

        User user = userRepository.findByEmail(email).orElse(null);

        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    @GetMapping("/expenses/{email}")
    public List<Expense> getExpenses(@PathVariable String email) {

        User user = userRepository.findByEmail(email).orElse(null);
        return expenseRepository.findByUserId(user.getId());
    }
}