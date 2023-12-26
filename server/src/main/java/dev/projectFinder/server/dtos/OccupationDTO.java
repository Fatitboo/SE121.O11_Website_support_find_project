package dev.projectFinder.server.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OccupationDTO {
    @NotBlank(message = "Occupation Name is required")
    private String occupationName;

    private String[] listMajor;
}
