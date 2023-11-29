package dev.projectFinder.server.dtos;

import dev.projectFinder.server.components.*;
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

    // set pick cv + des job
    private String descriptionJob;
    private CVLink[] cvLinks;
    // action implement for data
    // 1: update education seeker
    // 2: update experience seeker
    // 3: update award or certificate seeker
    // 4: update skill seeker
    // 4: update pick cv + des job

    private int actions;

}
