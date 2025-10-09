package com.example.user_registration_crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.user_registration_crud.model.User;

public interface UserRepository extends JpaRepository <User, Long>{
boolean existsByEmail(String email);
}
