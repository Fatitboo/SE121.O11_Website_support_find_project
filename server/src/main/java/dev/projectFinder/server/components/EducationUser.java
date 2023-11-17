package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EducationUser {
    private String universityName;
    private DetailMajorSeeker[] detailMajorSeekers;
    private String description;
}
