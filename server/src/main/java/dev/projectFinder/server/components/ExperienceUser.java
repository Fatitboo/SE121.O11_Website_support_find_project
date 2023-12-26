package dev.projectFinder.server.components;

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
    private int startYear;
    private int endYear;
    private String organizerName;
    private String description;

}
