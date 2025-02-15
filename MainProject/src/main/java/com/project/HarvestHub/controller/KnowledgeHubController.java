package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.KnowledgeHub;
import com.project.HarvestHub.service.KnowledgeHubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge-hub")
@CrossOrigin(origins = "http://localhost:3000")
public class KnowledgeHubController {

    private final KnowledgeHubService service;

    public KnowledgeHubController(KnowledgeHubService service) {
        this.service = service;
    }

    // Get all posts
    @GetMapping
    public ResponseEntity<List<KnowledgeHub>> getAllPosts() {
        return ResponseEntity.ok(service.getAllPosts());
    }

    // Get a single post by ID
    @GetMapping("/{id}")
    public ResponseEntity<KnowledgeHub> getPostById(@PathVariable Long id) {
        KnowledgeHub post = service.getPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    // Create a new post
    @PostMapping
    public ResponseEntity<KnowledgeHub> createPost(@RequestBody KnowledgeHub post) {
        return ResponseEntity.ok(service.createPost(post));
    }

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        service.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully.");
    }
}
