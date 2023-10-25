package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BackgroundUser {
    private String universityName;
    private String major;
    private String degree;
}
