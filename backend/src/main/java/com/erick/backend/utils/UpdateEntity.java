package com.erick.backend.utils;

import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import java.lang.reflect.Field;
import java.util.Arrays;
import org.springframework.http.HttpStatus;

/**
 * The {@code UpdateEntity} class provides static utility methods for updating entities with non-null values
 * from the corresponding Data Transfer Object (DTO).
 */
public class UpdateEntity {

    /**
     * Private constructor to prevent instantiation of this utility class.
     *
     * @throws IllegalStateException if an attempt is made to instantiate this class.
     */
    private UpdateEntity() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * Updates the provided object with non-null values from the corresponding source object.
     *
     * @param <T>            The type of the source object.
     * @param <U>            The type of the object to be updated.
     * @param updatedObject  The source object containing updated values.
     * @param objectToReturn The object to be updated with non-null values from the source.
     * @return The updated object.
     * @throws GlobalException If an error occurs during the update process, a global exception is thrown.
     */
    public static <T, U> U updateEntityFields(
        T updatedObject,
        U objectToReturn
    ) {
        Field[] fields = updatedObject.getClass().getDeclaredFields();
        Arrays
            .stream(fields)
            .forEach(field -> updateField(field, updatedObject, objectToReturn)
            );
        return objectToReturn;
    }

    private static <T, U> void updateField(
        Field field,
        T sourceObject,
        U targetObject
    ) {
        try {
            field.setAccessible(true);
            Object value = field.get(sourceObject);
            if (value != null) {
                Field correspondingField = findCorrespondingField(
                    targetObject,
                    field.getName()
                );
                correspondingField.setAccessible(true);
                correspondingField.set(targetObject, value);
            }
        } catch (IllegalAccessException | NoSuchFieldException exception) {
            throw new GlobalException(
                exception,
                HttpStatus.INTERNAL_SERVER_ERROR,
                I18nCode.TRANSACTION_NOT_FOUND,
                "Error updating the Entity",
                exception.getMessage()
            );
        }
    }

    /**
     * Finds the corresponding field in the target object based on the field name.
     *
     * @param targetObject The object in which to find the corresponding field.
     * @param fieldName    The name of the field to find.
     * @return The corresponding field in the target object.
     * @throws NoSuchFieldException If the field is not found in the target object.
     */
    private static Field findCorrespondingField(
        Object targetObject,
        String fieldName
    ) throws NoSuchFieldException {
        return targetObject.getClass().getDeclaredField(fieldName);
    }
}
