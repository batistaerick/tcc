package com.erick.backend.security;

import com.erick.backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implementation of the UserDetailsService interface for handling user authentication.
 * This service is responsible for loading user-specific data for the Spring Security framework.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserService service;

    /**
     * Loads the user by the username (in this case, the email) from the database.
     * This method is used by the Spring Security framework during the authentication process.
     *
     * @param username The username (email) of the user to load.
     * @return UserDetails object that Spring Security uses for authenticating the user.
     * @throws UsernameNotFoundException if the user cannot be found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException {
        com.erick.backend.domains.entities.User user = service.findByEmail(
            username
        );
        return new User(
            user.getEmail(),
            user.getPassword(),
            true,
            true,
            true,
            true,
            user.getAuthorities()
        );
    }
}
