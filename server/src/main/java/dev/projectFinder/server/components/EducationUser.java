package dev.projectFinder.server.components;

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
