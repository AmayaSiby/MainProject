package com.project.HarvestHub.service;

import com.project.HarvestHub.model.KnowledgeHub;
import com.project.HarvestHub.repository.KnowledgeHubRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KnowledgeHubService {

    private final KnowledgeHubRepository repository;

    public KnowledgeHubService(KnowledgeHubRepository repository) {
        this.repository = repository;
    }

    // Get all posts
    public List<KnowledgeHub> getAllPosts() {
        return repository.findAll();
    }

    // Create a new post
    public KnowledgeHub createPost(KnowledgeHub post) {
        return repository.save(post);
    }

    // Delete a post
    public void deletePost(Long id) {
        repository.deleteById(id);
    }

    // Get a post by ID
    public KnowledgeHub getPostById(Long id) {
        Optional<KnowledgeHub> post = repository.findById(id);
        return post.orElse(null); // Return null if not found
    }
}
