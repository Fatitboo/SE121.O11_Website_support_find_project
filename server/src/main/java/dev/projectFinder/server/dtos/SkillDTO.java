package dev.projectFinder.server.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SkillDTO {
    @NotBlank(message = "Skill Name is required")
    private String skillName;
    private String description;
}
