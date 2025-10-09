package com.example.user_registration_crud.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank(message = "Name is required")
	    private String name;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    @Column(unique = true)
	    private String email;

	    @Past(message = "Date of birth must be in the past")
	    private LocalDate dob;

	    // Getters & Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }
	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }
	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }
	    public LocalDate getDob() { return dob; }
	    public void setDob(LocalDate dob) { this.dob = dob; }

}
