package dev.projectFinder.server.responses;

import dev.projectFinder.server.components.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResumeResponse {
    private SkillUser[] skillUsers;
    private List<CVLink> cvLinks;
    private CertificationUser[] certificationUsers;
    private EducationUser[] educationUsers;
    private ExperienceUser[] experienceUsers;
    private String jobDes;

}
