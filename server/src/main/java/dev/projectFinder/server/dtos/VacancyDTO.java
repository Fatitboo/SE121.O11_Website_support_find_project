package dev.projectFinder.server.dtos;

import dev.projectFinder.server.components.ExperienceUser;
import dev.projectFinder.server.components.SkillUser;
import dev.projectFinder.server.components.Vacancy.*;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VacancyDTO {
    private String id;
    private JobBasic jobBasic;
    private JobDetail jobDetail;
    private JobBenefit jobBenefit;
    private JobDes jobDes;
    private JobRef jobRef;
    private JobPreScreen[] jobPreScreen;
    private int flag;
}
