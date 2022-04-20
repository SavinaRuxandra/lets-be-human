package ro.ubbcluj.backend.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ro.ubbcluj.backend.domain.dto.PostDto;
import ro.ubbcluj.backend.service.PostService;

import java.util.Collection;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @GetMapping
    public Collection<PostDto> findAllPosts() {
        logger.trace("Find all posts");
        return postService.findAll();
    }

    @GetMapping("/{postId}")
    public PostDto findPostById(@PathVariable Long postId) {
        logger.trace("Find post with id {}", postId);
        return postService.findById(postId);
    }

    @PostMapping()
    public PostDto addPost(
            @RequestPart("post") PostDto postDto,
            @RequestPart("photos") MultipartFile[] photos) {
        logger.trace("Add post {}", postDto);
        return postService.add(postDto, photos);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        logger.trace("Delete post with id {}", postId);
        postService.delete(postId);
    }

    @PutMapping
    public PostDto updatePost(@RequestBody PostDto postDto) {
        logger.trace("Update post with attributes {}", postDto);
        return postService.update(postDto);
    }
}
