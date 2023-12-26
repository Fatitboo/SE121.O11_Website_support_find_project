package dev.projectFinder.server.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CertificationUser {
    private String certificationName;
    private String certifiedBy;
    private String year;
    private String description;
}
