package com.anil.finance.controller;

import com.anil.finance.model.Expense;
import com.anil.finance.model.Income;
import com.anil.finance.model.User;
import com.anil.finance.repository.ExpenseRepository;
import com.anil.finance.repository.IncomeRepository;
import com.anil.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/summary/{email}")
    public Map<String, Double> getSummary(@PathVariable String email) {

        User user = userRepository.findByEmail(email).orElse(null);

        List<Expense> expenses = expenseRepository.findByUserId(user.getId());
        List<Income> incomes = incomeRepository.findByUserId(user.getId());

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;

        Map<String, Double> result = new HashMap<>();
        result.put("totalIncome", totalIncome);
        result.put("totalExpense", totalExpense);
        result.put("balance", balance);

        return result;
    }
}