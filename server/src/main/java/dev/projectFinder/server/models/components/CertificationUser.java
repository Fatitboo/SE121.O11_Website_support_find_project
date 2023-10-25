package dev.projectFinder.server.models.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CertificationUser {
    private String certificationName;
    private String certificedBy;
    private String year;
}
