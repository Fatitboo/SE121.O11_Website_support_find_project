package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.models.components.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class User {
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
    private String avatar;
    @Email
    private String email;
    private LocalDateTime dayOfBirth;
    private String website;
    private String description;
    private Address address;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;

    // Seeker
    private String expectSalary;
    private SkillUser[] skillUsers;
    private List<CVLink> cvLinks;
    private CertificationUser[] certificationUsers;
    private EducationUser[] educationUsers;
    private ExperienceUser[] experienceUsers;


    // Organizer
    private String teamSize;
    private String[] fields;
    private ObjectId[] vacancies;
    private ObjectId[] projects;


    // date create and update
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
