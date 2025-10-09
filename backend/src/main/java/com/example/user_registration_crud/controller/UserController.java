package com.example.user_registration_crud.controller;

import com.example.user_registration_crud.model.User;
import com.example.user_registration_crud.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend requests
public class UserController {
	 private final UserRepository userRepository;

	    public UserController(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }

	    @GetMapping
	    public List<User> list() {
	        return userRepository.findAll();
	    }

	    @PostMapping
	    public ResponseEntity<?> create(@Valid @RequestBody User user) {
	        if (user.getId() != null) user.setId(null); // ensure creation
	        if (userRepository.existsByEmail(user.getEmail())) {
	            return ResponseEntity.badRequest().body("Email already exists");
	        }
	        User saved = userRepository.save(user);
	        return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody User user) {
	        return userRepository.findById(id).map(existing -> {
	            existing.setName(user.getName());
	            existing.setEmail(user.getEmail());
	            existing.setDob(user.getDob());
	            userRepository.save(existing);
	            return ResponseEntity.ok(existing);
	        }).orElse(ResponseEntity.notFound().build());
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> delete(@PathVariable Long id) {
	        return userRepository.findById(id).map(u -> {
	            userRepository.delete(u);
	            return ResponseEntity.ok().build();
	        }).orElse(ResponseEntity.notFound().build());
	    }
}
