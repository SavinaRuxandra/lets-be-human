package ro.ubbcluj.backend.converter.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.dto.PostDto;
import ro.ubbcluj.backend.model.Client;
import ro.ubbcluj.backend.model.Post;
import ro.ubbcluj.backend.repository.ClientRepository;

@Component
@RequiredArgsConstructor
public class PostConverter implements BaseConverter<PostDto, Post> {

    private final ClientRepository clientRepository;

    @Override
    public PostDto convertModelToDto(Post model) {
        return PostDto.builder()
                .id(model.getId())
                .clientId(model.getClient().getId())
                .description(model.getDescription())
                .post(model.getContent())
                .build();
    }

    @Override
    public Post convertDtoToModel(PostDto dto) {
        Client client = clientRepository.findById(dto.getClientId()).orElseThrow();

        Post post = Post.builder()
                .client(client)
                .description(dto.getDescription())
                .content(dto.getPost())
                .build();
        post.setId(dto.getId());
        return post;
    }
}
