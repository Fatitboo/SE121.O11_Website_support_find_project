package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DetailMajorSeeker {
    private String majorName;
    private String degree;
    private int startYear;
    private int endYear;
}
