package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.models.components.ExperienceUser;
import dev.projectFinder.server.models.components.SkillUser;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "vacancies")
public class Vacancy {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId vacancyId;
    private String vacancyName;
    private SkillUser[] skillsRequired;
    private User responsibilitySeeker;
    private ExperienceUser[] experienceRequired;
    private int maxRequired;
    private String salary;
    private String salaryUnit;
    private User[] registants;
    private String String;


}
