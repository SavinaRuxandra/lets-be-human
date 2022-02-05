package ro.ubbcluj.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ro.ubbcluj.backend.dto.PostDto;
import ro.ubbcluj.backend.service.PostService;

import java.util.Collection;

@RestController
@CrossOrigin
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping
    public Collection<PostDto> findAllPosts() {
        return postService.findAll();
    }

    @GetMapping("/{postId}")
    public PostDto findPostById(@PathVariable Long postId) {
        return postService.findById(postId);
    }

    @PostMapping
    public PostDto addPost(@RequestBody PostDto postDto) {
        return postService.add(postDto);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.delete(postId);
    }

    @PutMapping
    public PostDto updatePost(@RequestBody PostDto postDto){
        return postService.update(postDto);
    }

}
