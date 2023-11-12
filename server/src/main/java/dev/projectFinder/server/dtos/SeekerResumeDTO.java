package dev.projectFinder.server.dtos;

import dev.projectFinder.server.models.components.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SeekerResumeDTO {
    // dto education seeker
    private EducationUser[] educationUsers;

    // dto experience seeker
    private ExperienceUser[] experienceUsers;

    // dto award or certificate seeker
    private CertificationUser[] certificationUsers;

    // dto skill seeker
    private SkillUser[] skillUsers;


    // action implement for data
    // 1: update education seeker
    // 2: update experience seeker
    // 3: update award or certificate seeker
    // 4: update skill seeker

    private int actions;

}
