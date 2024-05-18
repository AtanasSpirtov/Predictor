package com.base.baseprojectbackend.security.user;

import com.base.baseprojectbackend.security.model.RegisterModel;
import com.base.baseprojectbackend.security.role.RoleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            RoleService roleService,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User %s not found in the database", username));
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        });
        return new Principal(user);
    }

    public void register(RegisterModel registerModel) {
        User user = new User();

        user.setPassword(encodePassword(registerModel.getPassword()));
        user.setUsername(registerModel.getUsername());
        this.roleService.seedRolesInDb();
        if (this.userRepository.count() == 0) {
            user.setRoles(this.roleService.getAllRoles());
        } else {
            user.setRoles(new ArrayList<>());
            user.getRoles().add(this.roleService.findByRole("ROLE_USER"));
        }

        this.userRepository.save(user);
    }

    private String encodePassword(String password) {
        return this.passwordEncoder.encode(password);
    }

}
