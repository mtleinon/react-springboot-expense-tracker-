package com.example.codeengine.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.codeengine.expense.model.Category;
import com.example.codeengine.expense.repository.CategoryRepository;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	Logger logger = Logger.getLogger("MyLog"); 
//	private CategoryRepository categoryRepository;
//	
//	public CategoryController(CategoryRepository categoryRepository) {
//		super();
//		this.categoryRepository = categoryRepository;
//		
//	}
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/categories")
	List<Category> categories() {
		categoryRepository.findAll();
		return categoryRepository.findAll();
	}
	
	@GetMapping("/category/{id}")
	ResponseEntity<?> getCategory(@PathVariable Long id) {
		Optional<Category> category=categoryRepository.findById(id);
		
		return category.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/category")
	ResponseEntity<Category> createCategory(
			@Valid @RequestBody Category category) throws URISyntaxException {
		Category result=categoryRepository.save(category);
		logger.info("My first log");  

		return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);
	}

	@PutMapping("/category")
	ResponseEntity<Category> updateCategory(
			@Valid @RequestBody Category category) {
		Category result=categoryRepository.save(category);
		logger.info("My first log");  

		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id) {
		categoryRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
}
