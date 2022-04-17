package ro.ubbcluj.backend.converter;

import ro.ubbcluj.backend.domain.model.BaseEntity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public interface BaseConverter<D, M extends BaseEntity> extends Converter<D, M> {

    default List<D> convertModelsToDtos(Collection<M> models) {
        return models.stream().map(this::convertModelToDto).collect(Collectors.toList());
    }

    default List<M> convertDtosToModels(Collection<D> models) {
        return models.stream().map(this::convertDtoToModel).collect(Collectors.toList());
    }

}
