package com.erick.backend.enums;

import lombok.Getter;

@Getter
public enum I18nCode {
    INVALID_PASSWORD("invalidPassword"),
    EXISTING_EMAIL("existingEmail"),
    EMAIL_NOT_FOUND("emailNotFound"),
    TRANSACTION_NOT_FOUND("transactionNotFound"),
    IMAGE_NOT_FOUND("imageNotFound"),
    UNAUTHORIZED_DELETION("unauthorizedDeletion"),
    INVALID_IMAGE("invalidImage"),
    ERROR_GETTING_IMAGE("errorGettingImage");

    private final String code;

    I18nCode(String code) {
        this.code = code;
    }
}
