package ro.ubbcluj.backend.converter.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.domain.dto.PostDto;
import ro.ubbcluj.backend.domain.model.Post;
import ro.ubbcluj.backend.service.FileStorageService;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostConverter implements BaseConverter<PostDto, Post> {

    private final FileStorageService fileStorageService;

    @Override
    public PostDto convertModelToDto(Post model) {
        return PostDto.builder()
                .id(model.getId())
                .charityOrganizationAddress(model.getCharityOrganizationAddress())
                .headline(model.getHeadline())
                .description(model.getDescription())
                .readMoreUrl(model.getReadMoreUrl())
                .photos(
                        model.getPhotos().stream()
                                .map(fileStorageService::getFileAsByteArray)
                                .collect(Collectors.toList()))
                .build();
    }

    @Override
    public Post convertDtoToModel(PostDto dto) {
        Post post = Post.builder()
                .charityOrganizationAddress(dto.getCharityOrganizationAddress())
                .headline(dto.getHeadline())
                .description(dto.getDescription())
                .readMoreUrl(dto.getReadMoreUrl())
                .build();
        post.setId(dto.getId());
        return post;
    }
}
