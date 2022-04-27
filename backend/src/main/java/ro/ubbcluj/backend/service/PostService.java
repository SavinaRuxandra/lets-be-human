package ro.ubbcluj.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ro.ubbcluj.backend.converter.impl.PostConverter;
import ro.ubbcluj.backend.domain.dto.PostDto;
import ro.ubbcluj.backend.domain.model.Post;
import ro.ubbcluj.backend.exception.FileStorageException;
import ro.ubbcluj.backend.repository.PostRepository;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostConverter postConverter;
    private final FileStorageService fileStorageService;
    @Value("${base.root.file.storage}")
    private String BASE_ROOT_FILE_STORAGE;

    public Collection<PostDto> findAll() {
        return postConverter.convertModelsToDtos(postRepository.findAll());
    }

    public PostDto findById(Long postId) {
        return postConverter.convertModelToDto(postRepository.findById(postId).orElseThrow());
    }

    public PostDto add(PostDto postDto, MultipartFile[] photos) {
        Post post = postRepository.save(postConverter.convertDtoToModel(postDto));
        try {
            mapPhotoToPath(post, photos);
            savePhotosToServer(post, photos);
        } catch (FileStorageException ex) {
            delete(post.getId());
            throw ex;
        }

        return postConverter.convertModelToDto(post);
    }

    private void mapPhotoToPath(Post post, MultipartFile[] photos) {
        String charityOrganizationAddress = post.getCharityOrganizationAddress();
        Long postId = post.getId();
        AtomicInteger index = new AtomicInteger(0);

        post.setPhotos(
                Arrays.stream(photos)
                .map(photo -> String.format("%s\\posts\\user%s\\post%d\\%d.png", BASE_ROOT_FILE_STORAGE, charityOrganizationAddress, postId, index.getAndIncrement()))
                .collect(Collectors.toList())
        );
        postRepository.save(post);
    }

    private void savePhotosToServer(Post post, MultipartFile[] photos) {
        IntStream.range(0, post.getPhotos().size())
                .forEach(index -> fileStorageService.uploadFile(photos[index], post.getPhotos().get(index)));
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
                    newPost.setHeadline(post.getHeadline());
                    newPost.setDescription(post.getDescription());
                    newPost.setReadMoreUrl(post.getReadMoreUrl());
                    newPost.setPhotos(post.getPhotos());
                }
        );

        return postConverter.convertModelToDto(postOptionalInDb.orElseThrow());
    }
}
