package ro.ubbcluj.backend.converter.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.domain.dto.PostDto;
import ro.ubbcluj.backend.domain.model.CharityOrganization;
import ro.ubbcluj.backend.domain.model.Post;
import ro.ubbcluj.backend.repository.CharityOrganizationRepository;
import ro.ubbcluj.backend.service.FileStorageService;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostConverter implements BaseConverter<PostDto, Post> {

    private final CharityOrganizationRepository charityOrganizationRepository;
    private final FileStorageService fileStorageService;

    @Override
    public PostDto convertModelToDto(Post model) {
        return PostDto.builder()
                .id(model.getId())
                .charityOrganizationId(model.getCharityOrganization().getId())
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
        CharityOrganization charityOrganization = charityOrganizationRepository.findById(dto.getCharityOrganizationId()).orElseThrow();

        Post post = Post.builder()
                .charityOrganization(charityOrganization)
                .headline(dto.getHeadline())
                .description(dto.getDescription())
                .readMoreUrl(dto.getReadMoreUrl())
                .build();
        post.setId(dto.getId());
        return post;
    }
}
