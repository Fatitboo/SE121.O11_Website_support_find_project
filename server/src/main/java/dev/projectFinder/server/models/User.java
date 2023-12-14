package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class User implements UserDetails {
    // general information
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private String fullName;
    private String username;
    private String password;
    private String userType;
    private Boolean isVerify;
    private int googleAccountId;
    private String phoneNumber;
    private CVLink avatar;
    @Email
    private String email;
    private Date dayOfBirth;
    private String website;
    private String description;
    private Address address;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    private List<User> shortListedUser;
    private Boolean isActive;
    private List<ViewsProfile> viewsProfiles;
    // token + expired
    private String tokenResetPassword;
    private LocalDateTime expiredDateTokenResetPassword;

    private String tokenVerify;
    private LocalDateTime expiredDateTokenVerify;
    // Seeker
    private String expectSalary;
    private SkillUser[] skillUsers;
    private List<CVLink> cvLinks;
    private CertificationUser[] certificationUsers;
    private EducationUser[] educationUsers;
    private ExperienceUser[] experienceUsers;
    private String jobDes;
    private String jobTitle;
    private List<String> appliedVacancies;
    private List<String> receivedVacancies;
    private List<Notification> notifications;
    private List<String> favoriteProjects;
    private List<String> favoriteVacancies;
    // Organizer
    private String teamSize;
    private String[] fields;
    private List<String> vacancies;
    private List<String> projects;
    private List<String> unCompletedVacancies;


    // date create and update
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // role_seeker , role_organizer, role_admin
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+ getUserType().toUpperCase()));

        return authorityList;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
