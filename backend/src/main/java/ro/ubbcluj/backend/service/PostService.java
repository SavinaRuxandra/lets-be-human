package ro.ubbcluj.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.ubbcluj.backend.converter.impl.PostConverter;
import ro.ubbcluj.backend.dto.PostDto;
import ro.ubbcluj.backend.model.Post;
import ro.ubbcluj.backend.repository.PostRepository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostConverter postConverter;

    public Collection<PostDto> findAll() {
        return postRepository.findAll().stream()
                .map(postConverter::convertModelToDto)
                .collect(Collectors.toList());
    }

    public PostDto findById(Long postId) {
        return postConverter.convertModelToDto(postRepository.findById(postId).orElseThrow());
    }

    public PostDto add(PostDto postDto) {
        return postConverter.convertModelToDto(postRepository.save(postConverter.convertDtoToModel(postDto)));
    }

    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }

    @Transactional
    public PostDto update(PostDto postDto) {
        Post post = postConverter.convertDtoToModel(postDto);
        Optional<Post> postOptionalInDb = postRepository.findById(post.getId());

        postOptionalInDb.ifPresent(
                newPost -> {
                    newPost.setClient(post.getClient());
                    newPost.setDescription(post.getDescription());
                    newPost.setContent(post.getContent());
                }
        );

        return postConverter.convertModelToDto(postOptionalInDb.orElseThrow());
    }
}
