package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SkillUser {
    private String skillName;
    private String skillLevel;
}
