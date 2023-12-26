package dev.projectFinder.server.components.Vacancy;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Experience {
    private String occupationName;
    private String detailMajor;
    private int yearExpQuantity;
}
