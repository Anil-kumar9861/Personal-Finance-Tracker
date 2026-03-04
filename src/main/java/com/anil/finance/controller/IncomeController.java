package com.anil.finance.controller;

import com.anil.finance.model.Income;
import com.anil.finance.model.User;
import com.anil.finance.repository.IncomeRepository;
import com.anil.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/income/{email}")
    public Income addIncome(@PathVariable String email,
                            @RequestBody Income income) {

        User user = userRepository.findByEmail(email).orElse(null);

        income.setUser(user);
        return incomeRepository.save(income);
    }

    @GetMapping("/income/{email}")
    public List<Income> getIncome(@PathVariable String email) {

        User user = userRepository.findByEmail(email).orElse(null);
        return incomeRepository.findByUserId(user.getId());
    }
}