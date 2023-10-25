package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ExperienceUser {
    private String occupationName;
    private String[] detailMajor;
    private String startYear;
    private String numOfExperience;
}
